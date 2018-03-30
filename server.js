const http=require("http");
const fs=require("fs");

http.createServer((req,res)=>{
		let url;
		let GET={};
		if(req.url.indexOf("?")!=-1){
			let arr1=req.url.split("?");
			url=arr1[0];
			GET["id"]=arr1[1].split("=")[1];
			console.log(GET.id);
		}else{
			url=req.url;
		}
		if(url=="/info"){
		
			switch(GET.id){
				case '1':
					res.write(`{"ok": true,
					"img_src": "http://p1.music.126.net/uLuYZaxANzXoTYiAKhFB7g==/18975371672701341.webp?imageView&thumbnail=369x0&quality=75&tostatic=0&type=webp",
					"des":"华语歌里的宇宙丨我们飞向太空",
					"hot":"878.2万",
					"id":1,
					"number":6}`);
					break;
				case '2':
					 res.write(`{"ok": true, 
					"img_src": "http://p1.music.126.net/uLuYZaxANzXoTYiAKhFB7g==/18975371672701341.webp?imageView&thumbnail=369x0&quality=75&tostatic=0&type=webp",
					"author":"房东的猫",
					"name":"柔软",
					"id":2,
					"number":6}`);
					break;
				case '3':
					res.write(`{"ok": true, 
					"img_src": "http://p1.music.126.net/uLuYZaxANzXoTYiAKhFB7g==/18975371672701341.webp?imageView&thumbnail=369x0&quality=75&tostatic=0&type=webp",
					"des":"DJ王东的私人音乐频道",
					"title":"王东电台",
					"free":true,
					"id":3,
					"number":6}`);
					break;
				case '4':
					res.write(`{"ok": true, 
					"img_src": "http://p1.music.126.net/uLuYZaxANzXoTYiAKhFB7g==/18975371672701341.webp?imageView&thumbnail=369x0&quality=75&tostatic=0&type=webp",
					"title":"王啸坤:那些你们喜欢的不喜欢的我都喜欢",
					"read_ac":"7618",
					"id":4,
					"number":3}`);
					break;
				default:
					res.write('{"ok": false, "id": "未知id"}');
					break;
			}
			res.end();
		}else{
			fs.readFile("."+url,(err,data)=>{
				if(err){
					console.error(err);
				}
				else{
					res.write(data);
				}
				res.end();
			});
		}
	}
).listen(7070);