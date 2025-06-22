// tạo mảng các cấp độ chơi
const cacCap = [
    ["LậpTrình","CôngNghệ","LậpLuận","LoGic", ],
    ["MặtCắt","MộcMạc","MộtChiều","TháiDương", ],
    ["Chiếc-Lược-Ngà","Mùa-Len-Trâu","Qua-Đèo-Ngang","Bánh-Trôi-Nước"]
];

let soCap = 0;
let viTriSoMan = 0;
let tuGoc = "";
let ketQuaCu = "";
let chuBiXaoTron = [];
let chuDaChon = [];

const cauTraLoiDung =   [
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
]

//Hàm bắt đầu game

function batDauGame(){
    const manHinhChao = document.getElementById("manHinhChao");
    const khungGame = document.getElementById("khungGame");
    if (manHinhChao && khungGame) {
        manHinhChao.style.display = "none";
        khungGame.style.display = "block";
        batDauCap(0)
    }
}

// hàm bat đầu cấp
function batDauCap(so){
    if(so >= cacCap.length) return;
    soCap[so] = so;
    viTriSoMan = 0;
    document.getElementById("soCap").innerText = soCap + 1;
    document.getElementById("nutCapTiep").style.display = "inline";
    hienTuMoi()
}

//hàm cập nhật màn hình
function capNhatManHinh(){
    let khung = document.getElementById("khungGame");
    khung.innerText = ""
    chuBiXaoTron.forEach((char , i)=>{
        let nut = document.createElement("button");
        nut.innerText = char;
        nut.onclick = function (){
            chuDaChon.push(chuBiXaoTron[i]);
            chuBiXaoTron.splice(i,1);
        }
        khung.appendChild(nut);
    })
    document.getElementById("chuDaChon").innerText = chuDaChon.join("");
}

// hàm hiện từ mới
function hienTuMoi (){
    if(!cacCap[soCap]) return;
    let ketQua1 = document.getElementById("ketQua");
    let nutCapTiep1 = document.getElementById("nutCapTiep");
    let soMan1 = document.getElementById("soMan");
    if(viTriSoMan >= cacCap[soCap].length ){
        ketQua1.innerText = "🎉 Hoàn thành cấp độ!";
        nutCapTiep1.style.display = (soCap < cacCap.length) ? "block" : "none";
    }
    tuGoc = cacCap[soCap][viTriSoMan]
    chuBiXaoTron = xaoTronKhongTrung(tuGoc)
    chuDaChon = []
    capNhatManHinh()
    ketQua1.innerText = ""
    soMan1.innerText = viTriSoMan + 1
}