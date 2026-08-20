const form = document.getElementById("academyForm");

// ===============================
// ELEMENTLAR
// ===============================

const courseSelect = document.getElementById("course");
const englishLevelBox = document.getElementById("englishLevelBox");
const englishLevelSelect = document.getElementById("englishLevel");
const successMessage = document.getElementById("successMessage");

// ===============================
// GOOGLE APPS SCRIPT URL
// ===============================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyWO3qX_4d4N-Q-XiUrOwT255__qEn9iZ3qYji_Mtkvmu-2qXORulnWBnivGxsaoLXG/exec";


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

    const fullname =
        document.getElementById("fullname").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const age =
        document.getElementById("age").value.trim();

    const course =
        document.getElementById("course").value;

    const englishLevel =
        document.getElementById("englishLevel").value;

    const experience =
        document.getElementById("experience").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const selectedTime =
        document.querySelector('input[name="time"]:checked');

    const time =
        selectedTime ? selectedTime.value : "";


    // ===============================
    // TEKSHIRISH
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

    if (course === "Ingliz tili" && !englishLevel) {

        englishLevelBox.style.display = "block";
        englishLevelSelect.required = true;

        alert("Iltimos, ingliz tili darajangizni tanlang.");

        englishLevelSelect.focus();

        return;
    }

    if (!time) {

        alert(
            "Iltimos, o'qish uchun qulay vaqtingizni tanlang."
        );

        return;
    }


    // ===============================
    // MA'LUMOTLAR
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
    // TUGMA
    // ===============================

    const submitButton =
        form.querySelector('button[type="submit"]');

    if (submitButton) {

        submitButton.disabled = true;
        submitButton.textContent = "Yuborilmoqda...";

    }


    // ===============================
    // GOOGLE SHEETS + TELEGRAM
    // ===============================

    try {

        const response = await fetch(
            GOOGLE_SCRIPT_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(applicationData)
            }
        );


        const result = await response.json();


        // ===============================
        // MUVAFFAQIYATLI
        // ===============================

        if (result.success) {

            // Formani yashirish
            form.style.display = "none";


            // Success oynasini chiqarish
            successMessage.style.display = "block";


            // Formani tozalash
            form.reset();


            // English levelni yashirish
            englishLevelBox.style.display = "none";
            englishLevelSelect.required = false;

        } else {

            alert(
                "❌ Arizani yuborishda xatolik yuz berdi.\n\n" +
                (result.message ||
                "Iltimos, qaytadan urinib ko'ring.")
            );

        }


    } catch (error) {

        console.error("Xatolik:", error);

        alert(
            "❌ Server bilan bog'lanib bo'lmadi.\n\n" +
            "Iltimos, birozdan keyin qayta urinib ko'ring."
        );

    } finally {

        if (submitButton) {

            submitButton.disabled = false;
            submitButton.textContent = "Ariza yuborish";

        }

    }

});
