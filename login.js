/**
 * 2020.11.25
 */
Kakao.init("앱키");
console.log(Kakao.isInitialized()); // true: 정상 초기화 됨, false: 키값이 바르지않음
// Kakao.Auth.authorize();

const title = document.getElementById("title");
const btn_login = document.getElementById("btn_login");
const btn_logout = document.getElementById("btn_logout");
const btn_unlink = document.getElementById("btn_unlink");
const btn_info = document.getElementById("btn_info");

init();

function init(){
	if(Kakao.Auth.getAccessToken()){
		console.log("토큰 있음");
		title.innerText = "로그인 됨";
		btn_login.style.visibility = "hidden";
		btn_logout.style.visibility = "visible";
		btn_unlink.style.visibility = "visible";
		btn_info.style.visibility = "visible";
	}
	else{
		console.log("토큰 없음");
		title.innerText = "메인화면";
		btn_login.style.visibility = "visible";
		btn_logout.style.visibility = "hidden";
		btn_unlink.style.visibility = "hidden";
		btn_info.style.visibility = "hidden";
	}
}
	

function login(){
    Kakao.Auth.login({
        success: (authObj) => {
			console.log(authObj);
			console.log("login success");
		    console.log(Kakao.Auth.getAccessToken());
            init();
        },
        fail: (err) => {
          console.log(err);
        }
    });
}

function logout(){
	if(Kakao.Auth.getAccessToken()){ 
		Kakao.Auth.logout(function() { // 토큰 유지, 로그아웃 -> 계정 로그아웃
		    console.log(Kakao.Auth.getAccessToken());
			init();
		});
	}
}

function info(){
	Kakao.API.request({
	    url: '/v2/user/me',
	    success: function(response) {
	        console.log(response);
			console.log(response.kakao_account.email);
			console.log(response.kakao_account.profile.nickname);
			console.log(response.connected_at);
	    },
	    fail: function(error) {
			alert("로그인 하세요");
	        console.log(error);
	    }
	});
}

function unlink(){
	Kakao.API.request({ // 토큰 삭제 -> 계정 탈퇴
	  url: '/v1/user/unlink',
	  success: function(response) {
	    console.log(response);
		logout();
		init();
	  },
	  fail: function(error) {
		alert("로그인 하세요");
		console.log(error);
	  }
	});
}