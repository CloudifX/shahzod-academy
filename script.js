const form = document.getElementById("academyForm");

// ===============================
// ELEMENTLARNI OLISH
// ===============================

const courseSelect = document.getElementById("course");
const englishLevelBox = document.getElementById("englishLevelBox");
const englishLevelSelect = document.getElementById("englishLevel");
const successMessage = document.getElementById("successMessage");

// ===============================
// KURS TANLASH
// ===============================

courseSelect.addEventListener("change", function () {

    if (courseSelect.value === "Ingliz tili") {

        englishLevelBox.style.display = "block";
        englishLevelSelect.required = true;

    } else {

        englishLevelBox.style.display = "none";
        englishLevelSelect.required = false;
        englishLevelSelect.value = "";

    }

});

// ===============================
// FORM YUBORISH
// ===============================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // ===============================
    // MA'LUMOTLARNI OLISH
    // ===============================

    const fullname = document.getElementById("fullname").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const age = document.getElementById("age").value.trim();

    const course = document.getElementById("course").value;

    const englishLevel = document
        .getElementById("englishLevel")
        .value;

    const experience = document
        .getElementById("experience")
        .value.trim();

    const message = document
        .getElementById("message")
        .value.trim();

    const selectedTime = document.querySelector(
        'input[name="time"]:checked'
    );

    const time = selectedTime
        ? selectedTime.value
        : "";


    // ===============================
    // BO'SH MAYDONLARNI TEKSHIRISH
    // ===============================

    if (!fullname) {

        alert("Iltimos, ism va familiyangizni kiriting.");

        document.getElementById("fullname").focus();

        return;
    }


    if (!phone) {

        alert("Iltimos, telefon raqamingizni kiriting.");

        document.getElementById("phone").focus();

        return;
    }


    if (!age) {

        alert("Iltimos, yoshingizni kiriting.");

        document.getElementById("age").focus();

        return;
    }


    if (!course) {

        alert("Iltimos, kursni tanlang.");

        document.getElementById("course").focus();

        return;
    }


    // ===============================
    // INGLIZ TILI LEVEL TEKSHIRISH
    // ===============================

    if (course === "Ingliz tili" && !englishLevel) {

        englishLevelBox.style.display = "block";

        englishLevelSelect.required = true;

        alert(
            "Iltimos, ingliz tili darajangizni tanlang."
        );

        englishLevelSelect.focus();

        return;
    }


    // ===============================
    // VAQTNI TEKSHIRISH
    // ===============================

    if (!time) {

        alert(
            "Iltimos, o'qish uchun qulay vaqtingizni tanlang."
        );

        return;
    }


    // ===============================
    // MA'LUMOTLARNI OBYEKTGA YIG'ISH
    // ===============================

    const applicationData = {

        fullname: fullname,

        phone: phone,

        age: age,

        course: course,

        englishLevel: englishLevel,

        experience: experience,

        time: time,

        message: message

    };


    // ===============================
    // SERVERGA YUBORISH
    // ===============================

    console.log("Serverga yuborilmoqda...");
    console.log(applicationData);


    // Tugmani vaqtincha o'chirish

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent = "Yuborilmoqda...";

    }


    try {

        const response = await fetch(
            "/send-application",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(applicationData)
            }
        );


        // Server javobini olish

        const result = await response.json();


        // ===============================
        // MUVAFFAQIYATLI
        // ===============================

        if (response.ok && result.success) {

            // Formani tozalash

            form.reset();


            // English levelni yashirish

            englishLevelBox.style.display = "none";

            englishLevelSelect.required = false;


            // FORMNI YASHIRISH

            form.style.display = "none";


            // SUCCESS MESSAGE'NI CHIQARISH

            successMessage.style.display = "block";


            // Muvaffaqiyatli yuborilgandan keyin
            // sahifani success blokigacha olib kelish

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } else {

            alert(
                "❌ Xatolik yuz berdi.\n\n" +
                (
                    result.message ||
                    "Iltimos, qaytadan urinib ko'ring."
                )
            );

        }


    } catch (error) {

        console.error("Server xatosi:", error);

        alert(
            "❌ Server bilan bog'lanib bo'lmadi.\n\n" +
            "Internet yoki server ishlayotganini tekshiring."
        );

    } finally {

        // Tugmani qayta yoqish

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent = "Ariza yuborish";

        }

    }

});
