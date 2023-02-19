import csv
import json

def analyze_csv(file_path):
    ily_count = 0
    love_count = 0
    
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            data = row[3]
            ily_count += data.count('ily')
            love_count += data.count('love')
    
    result = {
        "ily": ily_count,
        "love": love_count
    }
    
    return json.dumps(result)