let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById('img');

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// هذا بتعمللي اخفاء للعناصر الموجودة اول ما افتح الصفحة
window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
};

//هذا بيعمللي ري ست للعناصر الي عندي يعني بيرجعها للاصل 
function resetValue(){
    //هذا بيحذف كل الفلاتر
    img.style.filter = 'none';

    // هذا بيرجع القيم لاصلها 
    statusbar.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}

// هذا بتعمللي رفع للصورة 
upload.onchange = function(){

    resetValue();  //هذا انا استدعيتها علشان اول ما اعمل ريسيت يرجع كل اشي للاصل

    //هذا بيعمللك اظهار للزارا الي اخفيتها
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';

    let file = new FileReader();  /* هذا بيقرا الملف الي رفعته */
    file.readAsDataURL(upload.files[0]);  /* هذا بيحط الملف الي قراته داخل الملف وبحطه باول عنصر عنده*/

    file.onload = function(){  /* هذا بيعمللي تحميل للصورة الموجودة عندي */
        img.src = file.result;  /* هذا بيضيف السورس في نتيجة الملف  */
    }

    //هذا بعد ما يعمل رفع للصورة بيضيفلك اياها بالكنفس 
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
    }

};

//هذا بيعمللي الفلاتر 
let filters = document.querySelectorAll("ul li input"); /* هذا بيجمعلك كل الفلاتر مع بعض */

filters.forEach(  filter =>{
    filter.addEventListener('input',  function(){
        /*img.style*/ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //هذا بيضيف الصورة بعد التعديل 

    })
} )


//هذا بينزل الصورة 
download.onclick = function(){
    download.href = canvas.toDataURL();
}