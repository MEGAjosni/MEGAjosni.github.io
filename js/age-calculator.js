document.addEventListener("DOMContentLoaded", () => {
    
    const birthDate = new Date('1999-02-18'); // YYYY-MM-DD format

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        // Check if the age is NaN
        if (isNaN(age) || age < 0) {
            return "Many";
        } else if (age > 99) {
            return "100+";
        } else {
            return age;
        }
    }

    document.getElementById('age').textContent = calculateAge(birthDate);
});