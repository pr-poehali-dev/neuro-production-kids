import json
import os
import urllib.request
import urllib.parse
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заявку на интенсив, сохраняет в БД и отправляет уведомление в Telegram"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    email = (body.get('email') or '').strip()
    phone = (body.get('phone') or '').strip()
    telegram = (body.get('telegram') or '').strip()

    if not name or not email or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Заполните имя, email и телефон'})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO registrations (name, email, phone, telegram) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, email, phone, telegram)
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if bot_token and chat_id:
        text = (
            f"🎬 Новая заявка на интенсив!\n\n"
            f"Имя: {name}\n"
            f"Email: {email}\n"
            f"Телефон: {phone}\n"
        )
        if telegram:
            text += f"Telegram: {telegram}\n"

        tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
        try:
            req = urllib.request.Request(tg_url, data=data)
            urllib.request.urlopen(req, timeout=5)
        except Exception:
            pass

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True, 'id': new_id})}
