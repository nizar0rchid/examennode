const User = function(id, fn, ln, phone, gender) {
    this.id = id;
    this.firstName = fn;
    this.lastName = ln;
    this.phone = phone;
    this.gender = gender;
}

module.exports = { User }