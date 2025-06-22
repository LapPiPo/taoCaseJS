// --- CHƯƠNG ---
const cacCap = [
    ["LậpTrình","CôngNghệ","LậpLuận","LoGic", ],
    ["MặtCắt","MộcMạc","MộtChiều","TháiDương", ],
    ["Chiếc-Lược-Ngà","Mùa-Len-Trâu","Qua-Đèo-Ngang","Bánh-Trôi-Nước"]
];

// --- BIẾN TOÀN CỤC ---
let soCap = 0;
let viTriSoMan = 0;
let tuGoc = "";
let chuBiXaoTron = [];
let chuDaChon = [];
let ketQuaCu = "";       // Biến lưu kết quả lần trước để tránh trùng lặp
let soLuotGoiY = 3;
let dungLienTiep = 0;
let soLanSai = 0;
let dangXuLy = false;

const cauTraLoiDung = [
    "✨ Chính xác!",
    "💯 Tuyệt vời ông mặt trời!",
    "🔤 Chuẩn không cần chỉnh!",
    " bạn xứng đáng với Vương miệng này 👑 !",
    "🚀 Bạn không cần suy nghĩ đúng không !",
    "🧠 Trí tuệ đỉnh cao!",
    "🌈 Mượt như Sunsilk!"
];

const cauTraLoiSai = [
    "❌ Sai rồi, thử lại nhé!",
    "🤔 Đã đúng đâu Ní!",
    "😵‍💫 Lộn chỗ rồi kìa!",
    "🔁 Bạn gấp lắm đúng không, bình tĩnh!",
    "🧩 Chưa khớp đâu nha!",
    "😶‍🌫️ Sai 1 tí à!",
    "📚 Bạn chắc chưa?, Sai tè le rồi."
];

// --- HÀM BẮT ĐẦU GAME ---
function batDauGame() {
    const manHinhChao = document.getElementById("manHinhChao");
    const khungGame = document.getElementById("khungGame");
    if (manHinhChao && khungGame) {
        manHinhChao.style.display = "none"; // Ẩn màn hình chào
        khungGame.style.display = "block";  // Hiển thị trò chơi
        batDauCap(0);                    // Bắt đầu cấp 1
    }
}

// --- HÀM BẮT ĐẦU CẤP ---
function batDauCap(so) {
    if (so >= cacCap.length) return;  // Kiểm tra chương hợp lệ
    soCap = so;
    viTriSoMan = 0;
    document.getElementById("soCap").innerText = soCap + 1;
    document.getElementById("nutCapTiep").style.display = "none";
    hienTuMoi();
    capNhatSoLuotGoiY();
    capNhatSoLuotSai();
    }


// --- HÀM CẬP NHẬT MÀN HÌNH ---
function capNhatManHinh() {
    let khung = document.getElementById("chuBiXaoTron");
    khung.innerHTML = "";
    chuBiXaoTron.forEach((char, i) => {
        let nut = document.createElement("button");
        nut.innerText = char;
        nut.onclick = function () {
            chuDaChon.push(chuBiXaoTron[i]);
            chuBiXaoTron.splice(i, 1);
            capNhatManHinh();
        };
        khung.appendChild(nut);
    });
    document.getElementById("chuDaChon").innerText = chuDaChon.join("");
}

// --- HÀM HIỂN THỊ TỪ MỚI ---
function hienTuMoi() {
    // Kiểm tra cấp độ hợp lệ, tránh lỗi nếu `soCap` vượt quá `cacCap`
    if (!cacCap[soCap]) return;

    let ketQuaEl = document.getElementById("ketQua");
    let nutCapTiepEl = document.getElementById("nutCapTiep");
    let soManEl = document.getElementById("soMan");

    if (viTriSoMan >= cacCap[soCap].length) {
        ketQuaEl.innerText = "🎉 Hoàn thành cấp độ!";
        nutCapTiepEl.style.display = (soCap + 1 < cacCap.length) ? "inline" : "none";
        return;
    }

    tuGoc = cacCap[soCap][viTriSoMan];
    chuBiXaoTron = xaoTronKhongTrung(tuGoc);
    chuDaChon = [];

    capNhatManHinh();

    ketQuaEl.innerText = "";
    soManEl.innerText = viTriSoMan + 1;
    capNhatSoLuotGoiY();
    capNhatSoLuotSai();
}


// --- HÀM XÁO TRỘN CHỮ KHÔNG BỊ TRÙNG ---
function xaoTronKhongTrung(tu) {
    let arr;
    do {
        arr = tu.split("");  // Chia từ thành mảng ký tự
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Xáo trộn ký tự
        }
    } while (arr.join("") === ketQuaCu);  // Kiểm tra tránh trùng lặp với lần trước

    ketQuaCu = arr.join("");  // Lưu lại kết quả để so sánh lần sau
    return arr;
}

// --- HÀM CHỌN NGẪU NHIÊN KHÔNG TRÙNG ---
function chonNgauNhienKhongTrung(mang) {
    if (mang.length === 0) return null;  // Nếu mảng rỗng, trả về null
    let index = Math.floor(Math.random() * mang.length); // Chọn ngẫu nhiên một phần tử
    return mang.splice(index, 1)[0];  // Lấy phần tử và xóa khỏi mảng để tránh trùng
}

// --- HÀM XÓA CHỮ ---
function xoaChu() {
    if (chuDaChon.length > 0) {
        let chu = chuDaChon.pop();  // Xóa ký tự cuối cùng đã chọn
        chuBiXaoTron.push(chu);  // Thêm lại vào danh sách xáo trộn
        capNhatManHinh();
    }
}

// --- HÀM KIỂM TRA KẾT QUẢ ---
function kiemTra(){
    if (dangXuLy) return;
    dangXuLy = true;

    const ketQua = document.getElementById("ketQua");

    if (chuDaChon.length < tuGoc.length) {
        ketQua.innerText = "⚠️ Bạn chưa chọn đủ chữ!";
        dangXuLy = false;
        return;
    }

    const daDung = chuDaChon.join("") === tuGoc;

    if (daDung) {
        dungLienTiep++;
        soLanSai = 0;

        if (dungLienTiep === 3) {
            soLuotGoiY++;
            capNhatSoLuotGoiY();
            ketQua.innerText = "🎉 3 lần đúng liên tiếp! Tặng 1 lượt gợi ý!";
            dungLienTiep = 0;
            setTimeout(() => {
                viTriSoMan++;
                hienTuMoi();
                dangXuLy = false;
            }, 1200);
            return;
        }

        ketQua.innerText = chonNgauNhienKhongTrung(cauTraLoiDung);
        setTimeout(() => {
            viTriSoMan++;
            hienTuMoi();
            dangXuLy = false;
        }, 1000);

    } else {
        dungLienTiep = 0;
        soLanSai++;
        capNhatSoLuotSai();
        ketQua.innerText = chonNgauNhienKhongTrung(cauTraLoiSai);

        if (soLanSai >= 3) {
            ketQua.innerText = "🚫 Bạn đã hết lượt chơi!";
            document.getElementById("nutChoiLai").style.display = "inline";
            dangXuLy = false;
        } else {
            // Cho phép thử lại sau nửa giây
            setTimeout(() => {
                dangXuLy = false;
            }, 500);
        }
    }
}


//Viết hàm gợi ý
function goiY() {
    const ketQua = document.getElementById("ketQua");
    if (soLuotGoiY > 0) {
        ketQua.innerText = `💡 Gợi ý: "${tuGoc}"`;
        soLuotGoiY--;
        capNhatSoLuotGoiY();
    } else {
        ketQua.innerText = "😅 Bạn đã dùng hết lượt gợi ý!";
    }
}

function capNhatSoLuotGoiY() {
    document.getElementById("soLuotGoiYText").innerText = `💡 Lượt gợi ý còn lại: ${soLuotGoiY}`;
}

//hàm chơi lại
    function choiLai() {
        soCap = 0;
        viTriSoMan = 0;
        soLuotGoiY = 3;
        dungLienTiep = 0;
        soLanSai = 0;

        document.getElementById("khungGame").style.display = "none";
        document.getElementById("manHinhChao").style.display = "block";
        document.getElementById("nutChoiLai").style.display = "none";
        capNhatSoLuotSai();
    }

function capNhatSoLuotSai() {
    document.getElementById("soLuotSaiText").innerText = `💥 Lượt sai: ${soLanSai} / 3`;
}