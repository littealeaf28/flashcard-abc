from flask import escape
import pandas as pd
import json
import requests

with open('result.csv', newline='') as f:
    df = pd.read_csv(f)

def get_level_diff(word, only_common=False):
    if only_common:
        word_df = df[(df['word']==word) & (df['common']==1)]
    else:
        word_df = df[df['word']==word]
    return (word_df.values[0][3], word_df.values[0][8]) if len(word_df) > 0 else (None, None)

# order words based on either level or frequency. 
def order_words(words, by=0, reverse=False, only_common=False):
    if (by not in {0, 1}): raise Exception("by is either 0 (by level), 1 (by frequency)")
    if (by == 1): reverse = not reverse
    
    word_results = []
    for word in words:
        level, freq = get_level_diff(word, only_common=only_common)
        if level != None:
            if by == 0:
                word_results.append((word, level))
            else:
                word_results.append((word, freq))
    word_results.sort(key=lambda x : x[1], reverse=reverse)
    return word_results

def translate_words(words, target):
    key = "AIzaSyCmB0XTpv7PBLGllUBGyTVZ8syJJz2rL-w"
    words_string = ""
    for word in words:
        words_string += "&q="
        words_string += word
    url = f"https://translation.googleapis.com/language/translate/v2?target={target}&key={key}{words_string}"
    res = json.loads(requests.get(url).content)['data']['translations']
    return [s['translatedText'] for s in res]

def hello_http(request):
    request_args = request.args

    #'words', 'lang-from', 'lang-to', 'by', 'reverse'

    if request_args and 'words' in request_args:
        words = json.loads(request_args['words'])
        if isinstance(words, list) and len(words) > 0:
            target = request_args.get('target', 'es')
            by_str = request_args.get('by', 'level')
            by = 1 if by_str == 'freq' else 0
            reverse = request_args.get('reverse', 'false') == 'true'
            only_common = request_args.get('only-common', 'false') == 'true'
            
            results = order_words(words, by=by, reverse=reverse, only_common=only_common)
            translated = translate_words([result[0] for result in results], target)
            return json.dumps([[results[i][0], results[i][1], translated[i]] for i in range(len(results))])
        else:
            return "not list"
    else:
        return "error"