//Bài 1:
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự",
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email",
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại",
    },
};

function getError(field) {
    const [key, subKey] = field.split(".");
    return errors[key][subKey] || errors[key].required;
}

console.log(getError("name")); //Vui lòng nhập họ tên
console.log(getError("name.min")); //Họ tên phải từ 5 ký tự
console.log(getError("email")); //Vui lòng nhập địa chỉ email
console.log(getError("email.unique")); //Email đã có người sử dụng
console.log(getError("password")); //Vui lòng nhập mật khẩu
console.log(getError("password.same")); //Mật khẩu phải khớp với mật khẩu nhập lại

//Bài 2:
const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function createCustomers(customers) {
    return customers
        .map((customer) => {
            const shortName = `${customer.name
                .split(" ")
                .slice(0, 1)} ${customer.name.split(" ").slice(-1)}`;

            return { ...customer, shortName };
        })
        .sort((a, b) => a.age - b.age);
}

const result = createCustomers(customers);
console.log(result);

//Bài 3:
const data = [];

function handleRegister(name, password, email) {
    if (!name || !password || !email) {
        console.log("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    const user = {
        name,
        password,
        email,
        role: "user",
    };

    data.push(user);
    return user;
}

function handleLogin(email, password) {
    const user = data.find(
        (user) => user.email === email && user.password === password,
    );

    if (!user) {
        return "Thông tin đăng nhập không hợp lệ";
    }

    return user;
}

var dataRegister = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@email.com",
);

var dataRegister = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com",
);

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");

console.log(data);
console.log(dataLogin);
