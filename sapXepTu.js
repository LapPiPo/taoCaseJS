// --- CHƯƠNG ---
const cacChuong = [
    ["laptrinh", "dulieu"],        // Chương 1
    ["congnghe", "tritue"]         // Chương 2
];

// --- BIẾN TOÀN CỤC ---
let soChuong = 0;
let viTriCapDo = 0;
let tuGoc = "";
let chuXaoTron = [];
let chuDaChon = [];

const cauTraLoiDung = [
    "✨ Chính xác!",
    "💯 Tuyệt vời ông mặt trời!",
    "🔤 Chuẩn không cần chỉnh!",
    "👑 bạn xứng đáng với Vương miệng này !",
    "🚀 Bạn không cần suy nghĩ đúng không !",
    "🧠 Trí tuệ đỉnh cao!",
    "🌈 Như một vần thơ Tiếng Việt!"
];

const cauTraLoiSai = [
    "❌ Sai rồi, thử lại nhé!",
    "🤔 Đã đúng đâu Ní!",
    "😵‍💫 Lộn chỗ rồi kìa!",
    "🔁 Bạn gấp lắm đúng không, bình tĩnh!",
    "🧩 Chưa khớp đâu nha!",
    "😶‍🌫️ Sai 1 tí à!",
    "📚 Bạn chắc chưa?"
];

// 🎬 Hàm bắt đầu game
function batDauGame() {
    document.getElementById("manHinhChao").style.display = "none";
    document.getElementById("khungGame").style.display = "block";
    batDauChuong(0);
}

// --- XÁO TRỘN ---
function xaoTronTu(tu) {
    let mangGoc = tu.split("");
    let ketQua = [];
    while (mangGoc.length > 0) {
        let viTri = Math.floor(Math.random() * mangGoc.length);
        ketQua.push(mangGoc[viTri]);
        for (let i = viTri; i < mangGoc.length - 1; i++) {
            mangGoc[i] = mangGoc[i + 1];
        }
        mangGoc.length--;
    }
    return ketQua;
}

function batDauChuong(so) {
    soChuong = so;
    viTriCapDo = 0;
    document.getElementById("soChuong").innerText = so + 1;
    document.getElementById("nutChuongTiep").style.display = "none";
    hienTuMoi();
}

function hienTuMoi() {
    let danhSachTu = cacChuong[soChuong];
    if (viTriCapDo >= danhSachTu.length) {
        document.getElementById("chuBiXaoTron").innerHTML = "";
        document.getElementById("tuDaChon").innerText = "";
        document.getElementById("ketQua").innerText = "🎉 Hoàn thành chương!";
        if (soChuong + 1 < cacChuong.length) {
            document.getElementById("nutChuongTiep").style.display = "inline";
        }
        return;
    }
    tuGoc = danhSachTu[viTriCapDo];
    chuXaoTron = xaoTronTu(tuGoc);
    chuDaChon = [];
    capNhatManHinh();
    document.getElementById("ketQua").innerText = "";
    document.getElementById("soCap").innerText = viTriCapDo + 1;
}

function capNhatManHinh() {
    let khung = document.getElementById("chuBiXaoTron");
    khung.innerHTML = "";
    for (let i = 0; i < chuXaoTron.length; i++) {
        let nut = document.createElement("button");
        nut.innerText = chuXaoTron[i];
        nut.onclick = function () {
            chuDaChon.push(chuXaoTron[i]);
            chuXaoTron.splice(i, 1);
            capNhatManHinh();
        };
        khung.appendChild(nut);
    }
    document.getElementById("tuDaChon").innerText = chuDaChon.join("");
}

function chonNgauNhien(mang) {
    return mang[Math.floor(Math.random() * mang.length)];
}

function kiemTra() {
    const ketQua = document.getElementById("ketQua");
    if (chuDaChon.join("") === tuGoc) {
        ketQua.innerText = chonNgauNhien(cauTraLoiDung);
        viTriCapDo++;
        setTimeout(hienTuMoi, 1200);
    } else {
        ketQua.innerText = chonNgauNhien(cauTraLoiSai);
    }
}

function xoaChu() {
    if (chuDaChon.length > 0) {
        let chu = chuDaChon.pop();
        chuXaoTron.push(chu);
        capNhatManHinh();
    }
}