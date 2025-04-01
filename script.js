// التحكم في قائمة الموبايل
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-fade-in');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fade-in');
    }
}

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
            // إغلاق قائمة الموبايل عند النقر على رابط
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// إضافة تأثيرات عند التمرير
function handleScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // إظهار العنصر عندما يكون في منتصف الشاشة
        if (position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });

    // تغيير لون القائمة العلوية عند التمرير
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
}

// إضافة تأثيرات للبطاقات
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });

    card.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
});

// عداد تصاعدي للأرقام
function animateNumbers() {
    const numberElements = document.querySelectorAll('.animate-number');
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // مدة الحركة بالمللي ثانية
        const step = target / (duration / 16); // 16ms لكل فريم
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.unobserve(element);
            }
        });

        observer.observe(element);
    });
}

// تحميل الصفحة
window.addEventListener('load', function() {
    // إضافة كلاس للعناصر المتحركة
    document.querySelectorAll('.feature-card, .team-card, .testimonial-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // تشغيل عداد الأرقام
    animateNumbers();

    // إضافة تأثير التمرير للصور
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// مراقبة حدث التمرير
window.addEventListener('scroll', handleScroll);

// التحقق من صحة النموذج
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'هذا الحقل مطلوب');
        } else {
            hideError(input);
        }

        // التحقق من صحة البريد الإلكتروني
        if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            showError(input, 'يرجى إدخال بريد إلكتروني صحيح');
        }

        // التحقق من كلمة المرور
        if (input.type === 'password' && !validatePassword(input.value)) {
            isValid = false;
            showError(input, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        }
    });

    return isValid;
}

// إظهار رسالة الخطأ
function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        const newErrorDiv = document.createElement('div');
        newErrorDiv.className = 'error-message text-red-500 text-sm mt-1';
        newErrorDiv.textContent = message;
        input.parentNode.insertBefore(newErrorDiv, input.nextSibling);
    }
    input.classList.add('border-red-500');
}

// إخفاء رسالة الخطأ
function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.style.display = 'none';
    }
    input.classList.remove('border-red-500');
}

// التحقق من البريد الإلكتروني
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// التحقق من كلمة المرور
function validatePassword(password) {
    return password.length >= 8;
}

// إرسال النموذج
function handleSubmit(event, formId) {
    event.preventDefault();
    if (validateForm(formId)) {
        // إظهار رسالة نجاح
        const form = document.getElementById(formId);
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 text-green-700 p-4 rounded-lg mt-4 animate-fade-in';
        successMessage.textContent = 'تم إرسال النموذج بنجاح!';
        form.appendChild(successMessage);

        // إعادة تعيين النموذج بعد 2 ثانية
        setTimeout(() => {
            form.reset();
            successMessage.remove();
        }, 2000);
    }
}