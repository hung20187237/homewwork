import React from 'react'
import { useEffect } from 'react';
import "./FBLogin.css"

export default function FBLogin() {
    
    
    
        
  
    
      // [2] Xử lý trạng thái đăng nhập
    function statusChangeCallback(response) {
        // Người dùng đã đăng nhập FB và đã đăng nhập vào ứng dụng
        if (response.status === 'connected') {
            ShowWelcome();
        }
            // Người dùng đã đăng nhập FB nhưng chưa đăng nhập ứng dụng
        else if (response.status === 'not_authorized') {
            ShowLoginButton();
        }
            // Người dùng chưa đăng nhập FB
        else {
            ShowLoginButton();
        }
    }
    // [3] Yêu cầu đăng nhập FB
    
    function RequestLoginFB() {
        window.location = 'http://graph.facebook.com/oauth/authorize?client_id=357364879892123&scope=public_profile,user_posts,user_photos&redirect_uri=http://localhost:3000/fblogin&response_type=token';
    }

    // [4] Hiển thị nút đăng nhập
    function ShowLoginButton() {
        document.getElementById('btb').setAttribute('style', 'display:block');
        document.getElementById('lbl').setAttribute('style', 'display:none');
    }

    // [5] Chào mừng người dùng đã đăng nhập
    function ShowWelcome() {
        document.getElementById('btb').setAttribute('style', 'display:none');
        window.FB.api('/me', function (response) {
            var name = response.name;
            var username = response.username;
            var id = response.id;
            document.getElementById('lbl').innerHTML = 'Tên=' + name + ' | username=' + username + ' | id=' + id;
            document.getElementById('lbl').setAttribute('style', 'display:block');
        });
    }
    

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  return (
    // <!-- NÚT ĐĂNG NHẬP -->
    <div>
        <input id="btb" type="button" value="ĐĂNG NHẬP" onClick={RequestLoginFB()}  style={{display: "none"}}/>
        <p id="lbl" style={{display: "none"}}>BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG!</p>
    
        <br />


        {/* <p>POST THỬ</p> */}

        <form action="https://graph.facebook.com/100547109409842/feed?" method="post" enctype="multipart/form-data">
            message<br />
            <input type="text" name="message" />
            <br /><br />
            link<br />
            <input type="text" name="link" />
            <br /><br />
            picture<br />
            <input type="text" name="picture" />
            <br /><br />
            description<br />
            <input type="text" name="description" />
            <br /><br />
            caption<br />
            <input type="text" name="caption" />
            <br /><br />
            name<br />
            <input type="text" name="name" />
            <br /><br />
            access_token<br />
            <input type="text" name="access_token" />
            <input type="submit" />

        </form>
    </div>
    
  )
}

