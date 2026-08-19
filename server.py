from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)


# ==========================================
# TELEGRAM BOT
# ==========================================

BOT_TOKEN = "8988250341:AAH9wZhZtR-9Pj9Nrmna-WpSIFP_Adx498Y"
CHAT_ID = "8885674120"


# ==========================================
# SHAHZOD ACADEMY
# ==========================================

ACADEMY_FOLDER = r"C:\Users\Shoxrux\Desktop\Shshzod Academy"


@app.route("/")
def home():
    return send_from_directory(
        ACADEMY_FOLDER,
        "index.html"
    )


# ==========================================
# CSS
# ==========================================

@app.route("/style.css")
def style():
    return send_from_directory(
        ACADEMY_FOLDER,
        "style.css"
    )


# ==========================================
# JAVASCRIPT
# ==========================================

@app.route("/script.js")
def script():
    return send_from_directory(
        ACADEMY_FOLDER,
        "script.js"
    )


# ==========================================
# TELEGRAMDAN CHAT ID OLISH
# ==========================================

@app.route("/get-chat-id")
def get_chat_id():

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"

    response = requests.get(url)

    return response.json()


# ==========================================
# ARIZA QABUL QILISH VA TELEGRAMGA YUBORISH
# ==========================================

@app.route("/send-application", methods=["POST"])
def send_application():

    data = request.json

    fullname = data.get("fullname")
    phone = data.get("phone")
    age = data.get("age")
    course = data.get("course")
    english_level = data.get("englishLevel")
    experience = data.get("experience")
    time = data.get("time")
    message = data.get("message")

    # ======================================
    # TERMINALDA KO'RSATISH
    # ======================================

    print()
    print("================================")
    print("      YANGI ARIZA")
    print("      SHAHZOD ACADEMY")
    print("================================")

    print("Ism:", fullname)
    print("Telefon:", phone)
    print("Yosh/Sinf:", age)
    print("Yo'nalish:", course)
    print("Ingliz tili darajasi:", english_level)
    print("Oldingi tajriba:", experience)
    print("Dars vaqti:", time)
    print("Qo'shimcha ma'lumot:", message)

    print("================================")


    # ======================================
    # TELEGRAM XABARI
    # ======================================

    telegram_message = f"""
🔔 YANGI ARIZA
🏫 SHAHZOD ACADEMY

👤 Ism: {fullname}
📞 Telefon: {phone}
🎓 Yosh/Sinf: {age}

📚 Yo'nalish: {course}
🇬🇧 Ingliz tili darajasi: {english_level}

📖 Oldingi tajriba:
{experience}

⏰ Dars vaqti:
{time}

💬 Qo'shimcha ma'lumot:
{message}

📍 Chust tumani, Olmos shaharchasi, Sentr
"""


    # ======================================
    # TELEGRAMGA YUBORISH
    # ======================================

    telegram_url = (
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    )

    telegram_data = {
        "chat_id": CHAT_ID,
        "text": telegram_message
    }

    telegram_response = requests.post(
        telegram_url,
        json=telegram_data
    )


    # ======================================
    # NATIJANI TEKSHIRISH
    # ======================================

    print("Telegram javobi:")
    print(telegram_response.json())

    if telegram_response.ok:
        print("✅ Ariza Telegramga yuborildi!")
    else:
        print("❌ Telegramga yuborishda xatolik!")


    # ======================================
    # SAYTGA JAVOB
    # ======================================

    return jsonify({
        "success": True,
        "message": "Ariza qabul qilindi"
    })


# ==========================================
# SERVER
# ==========================================

if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )