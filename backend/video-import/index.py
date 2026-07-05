import json
import os
import time
import urllib.request
import boto3
from botocore.config import Config


def handler(event: dict, context) -> dict:
    '''Скачивает видео по прямой ссылке и загружает его в файловое хранилище сайта (S3), возвращает CDN-ссылку'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    params = event.get('queryStringParameters') or {}
    src_url = params.get('url')
    key = params.get('key', 'videos/hero.mp4')

    if not src_url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'url parameter is required'})
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        region_name='ru-central1',
        config=Config(signature_version='s3v4', s3={'addressing_style': 'path'}, retries={'max_attempts': 1})
    )

    req = urllib.request.Request(src_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        data = resp.read()

    last_error = None
    for attempt in range(6):
        try:
            s3.put_object(Bucket='files', Key=key, Body=data, ContentType='video/mp4')
            last_error = None
            break
        except Exception as e:
            last_error = str(e)
            time.sleep(2)

    if last_error:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': last_error, 'size_bytes': len(data)})
        }

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'cdn_url': cdn_url})
    }
