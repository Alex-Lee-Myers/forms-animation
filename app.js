const containers = document.querySelectorAll(`.input-container`);
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

//Line
const start =
    "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
    "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//Elastic Effect
containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

input.addEventListener("focus", () => {
    //Check to see if there is any text in the input
    if (!input.value) {
        tl.fromTo(
            line,
            { attr: { d: start } },
            { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
      //Placeholder Shift
        tl.to(
            placeholder,
        {
                top: -15,
                left: 0,
                scale: 0.7,
                duration: 0.5,
                ease: "Power2.easeOut",
        },
            "<15%"
            );
        }
    });
});

//Revert back if it is not focused.
form.addEventListener("click", () => {
    containers.forEach((container) => {
        const input = container.querySelector(".input");
        const line = container.querySelector(".elastic-line");
        const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
        if (!input.value) {
            gsap.to(placeholder, {
                top: 0,
                left: 0,
                scale: 1,
                duration: 0.5,
                ease: "Power2.easeOut",
                });
            }
        }
        
        //!Validation done here
        input.addEventListener('input', (e) => {
            //? Name Validation
            if (e.target.type === 'text'){
                let inputText = e.target.value;
                if (inputText.length > 2)   {
                    //Colorizee function here
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize("#FE8C99", line, placeholder);
                }
            }
            //? Email Validation
            if (e.target.type === 'email')  {
                let valid = validateEmail(e.target.value);
                if (valid){
                    //Colorizee function here
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize("#FE8C99", line, placeholder);
                }
            }
            //? Phone Validation
            if (e.target.type === 'tel')    {
                let valid = validatePhone(e.target.value);
                if (valid){
                    //Colorizee function here
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize("#FE8C99", line, placeholder);
                }
            }
        });
    });
});

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
}

//Colorize function
function colorize(color, line, placeholder){
    gsap.to(line, {stroke: color, duration: 0.75, ease: "Power2.easeOut"});
    gsap.to(placeholder, {color: color, duration: 0.75, ease: "Power2.easeOut"});
}
