import pandas as pd
from collections import Counter
import nltk
import os

def parse_chat_data(filename):
    file = pd.read_csv(filename)
    file.drop(["AuthorID", "Attachments", "Reactions"], inplace=True, axis = 1)
    file.dropna(subset=["Content"], inplace=True)
    file.loc[:,"Author"] = file.loc[:,"Author"].str[:-5]

    users = file.loc[:,"Author"].unique()
    user1 = users[0]
    user2 = users[1]
    u1 = file.loc[file["Author"] == user1]
    u2 = file.loc[file["Author"] == user2]

    df = file.loc[:,["Author", "Date"]]
    df["Date"] = pd.to_datetime(df["Date"])
    df['block'] = ((df.Author != df.Author.shift()).cumsum())
    mean_response_time = df.drop_duplicates('block', keep='first')['Date'].diff().mean()

    df['response_time'] = df.drop_duplicates('block', keep='first')['Date'].diff()
    gr = df.groupby('Author').response_time
    mean_response_times = (gr.sum() / gr.count())/pd.Timedelta(hours=1)

    stopwords = nltk.corpus.stopwords.words('english')
    # RegEx for stopwords
    RE_stopwords = r'\b(?:{})\b'.format('|'.join(stopwords))
    # replace '|'-->' ' and drop all stopwords
    words = (u1.Content
            .str.lower()
            .replace([r'\'|=|\>|\<|u|r|\"|\:|\,|\.', r'\|', RE_stopwords], ['', ' ', ''], regex=True)
            .str.cat(sep=' ')
            .split()
    )

    # generate DF out of Counter
    rslt1 = pd.DataFrame(Counter(words).most_common(100),
                        columns=['Word', 'Frequency'])


    words = (u2.Content
            .str.lower()
            .replace([r'\'|=|\>|\<|u|r|\"|\:|\,|\.', r'\|', RE_stopwords], ['', ' ', ''], regex=True)
            .str.cat(sep=' ')
            .split()
    )

    # generate DF out of Counter
    rslt2 = pd.DataFrame(Counter(words).most_common(100),
                        columns=['Word', 'Frequency'])

    df = pd.concat([rslt1, pd.Series({"Word":user1,
                        "Frequency":mean_response_times[user1]}).to_frame().T, rslt2,
                        pd.Series({"Word":user2,
                        "Frequency":mean_response_times[user2]}).to_frame().T])
    return df.to_json(orient="records")
    
