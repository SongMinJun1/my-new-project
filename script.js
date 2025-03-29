// 🎯 [1] 테마 입력 요소 가져오기
const bgInput = document.getElementById("bgColorInput");      // 배경색 입력창
const textInput = document.getElementById("textColorInput");  // 텍스트 색 입력창
const btnInput = document.getElementById("btnColorInput");    // 버튼 텍스트 색 입력창
const applyThemeBtn = document.getElementById("applyThemeBtn"); // "테마 적용" 버튼

// 🎯 [2] 테마 적용 함수 (사용자 입력을 바탕으로 색상 적용)
function applyTheme() {
    const bgColor = bgInput.value;       // 사용자가 입력한 배경색
    const textColor = textInput.value;   // 사용자가 입력한 텍스트 색
    const btnColor = btnInput.value;     // 사용자가 입력한 버튼 글자색

    // ✅ [2-1] 입력한 색상이 유효한 CSS 색상인지 확인
    const isBgValid = CSS.supports("color", bgColor);
    const isTextValid = CSS.supports("color", textColor);
    const isBtnValid = CSS.supports("color", btnColor);

    if (!isBgValid || !isTextValid || !isBtnValid) {
        alert("유효하지 않은 색상이 있습니다.");
        return; // 조건 하나라도 틀리면 함수 종료
    }

    // ✅ [2-2] 실제 스타일 적용
    document.body.style.backgroundColor = bgColor;                  // 배경색 변경
    document.querySelector("h1").style.color = textColor;          // 제목 텍스트 색상 변경
    applyThemeBtn.style.backgroundColor = btnColor;                // 버튼 배경색 변경

    // 🧠 [2-3] 버튼 텍스트 색상 자동 조정 (밝기에 따라 흰/검 텍스트)
    const { r, g, b } = hexToRgb(btnColor);                        // HEX → RGB 변환
    const brightness = getBrightness(r, g, b);                     // 밝기 계산
    applyThemeBtn.style.color = brightness > 128 ? "black" : "white"; // 밝으면 검정, 어두우면 흰색
}

// 🎯 [3] 랜덤 색상 생성 함수 (#XXXXXX 형식으로 반환)
function getRandomColor() {
    const letters = "0123456789ABCDEF"; // HEX 문자 목록
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // 0~15 중 랜덤 선택
    }
    return color;
}

// 🎯 [4] HEX 색상 코드를 RGB로 변환하는 함수
function hexToRgb(hex) {
    hex = hex.replace("#", ""); // "#" 제거
    let r = parseInt(hex.substring(0, 2), 16); // 앞 2자리 → 빨강
    let g = parseInt(hex.substring(2, 4), 16); // 중간 2자리 → 초록
    let b = parseInt(hex.substring(4, 6), 16); // 마지막 2자리 → 파랑
    return { r, g, b }; // 객체 형태로 반환
}

// 🎯 [5] RGB 값 기반 밝기 계산 함수 (YIQ 공식)
function getBrightness(r, g, b) {
    // 가중치 계산: 인간 눈이 밝기 인식에 민감한 순서대로
    return (r * 0.299) + (g * 0.587) + (b * 0.114);
}

// 🎯 [6] 클릭 이벤트 연결: 버튼 누르면 테마 적용
applyThemeBtn.addEventListener("click", applyTheme);