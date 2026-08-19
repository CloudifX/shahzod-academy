const form = document.getElementById("academyForm");


// ===============================
// KURS TANLASH
// ===============================

const courseSelect = document.getElementById("course");

const englishLevelBox = document.getElementById("englishLevelBox");

const englishLevelSelect = document.getElementById("englishLevel");


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


    const fullname =
        document.getElementById("fullname").value;

    const phone =
        document.getElementById("phone").value;

    const age =
        document.getElementById("age").value;

    const course =
        document.getElementById("course").value;

    const englishLevel =
        document.getElementById("englishLevel").value;

    const experience =
        document.getElementById("experience").value;

    const message =
        document.getElementById("message").value;


    const selectedTime =
        document.querySelector(
            'input[name="time"]:checked'
        );

    const time =
        selectedTime ? selectedTime.value : "";


    // Barcha ma'lumotlarni bitta obyektga yig'amiz

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


    console.log("Serverga yuborilmoqda...");
    console.log(applicationData);


    try {

        // Python serverga yuboramiz

        const response = await fetch(
            "http://127.0.0.1:5000/send-application",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(applicationData)
            }
        );


        const result = await response.json();


        if (result.success) {

            alert(
                "Arizangiz qabul qilindi!\n\n" +
                "Tez orada administratorimiz siz bilan bog'lanadi."
            );

            form.reset();

            englishLevelBox.style.display = "none";

            englishLevelSelect.required = false;

        } else {

            alert(
                "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
            );

        }


    } catch (error) {

        console.error("Server xatosi:", error);

        alert(
            "Server bilan bog'lanib bo'lmadi."
        );

    }

});