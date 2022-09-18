var CanvasContext;
    var Canvas;
    window.onload=function(){
        Canvas=document.getElementById("GameCanvas");
        CanvasContext=Canvas.getContext("2d");
        document.addEventListener("keydown",keyPush);
        setInterval(Game,1000/15);
    }
    var GameSize=30; //Oyun alanı
    var xv=yv=0; //ilerleme değeri
    var px=py=10; //yılanın şimdiki konumu
    var ax=ay=15; //elmanın başlangıç konumu(daha sonra rastgele konumlara gidecek)
    var trail=[]; //Yılanın yolu
    var tail=5; //yılanın başlangıç uunluğu

    function Game(){
        px +=xv; //ilerleme değerini şimdiki konuma ekliyoruz (x ekseni)   
        py +=yv; //ilerleme değerini şimdiki konuma ekliyoruz (y ekseni)

        //x ekseni
        if(px<0){ //Yılan sol kenara çarparsa ekranın sağından çıksın
            px= GameSize-1;
        }
        if(px>GameSize-1){ //Yılan sağ kenara çarparsa soldan çıksın
            px=0;
        } 

        //y ekseni
        if(py<0){ //Yılan üst kenara çarparsa ekranın altından çıksın
            py= GameSize-1;
        }
        if(py>GameSize-1){ //Yılan alt kenara çarparsa üstten çıksın
            py=0;
        }

        CanvasContext.fillStyle="black"; //Oyun Alanını Siyah ile doldururuz 
        CanvasContext.fillRect(0,0,Canvas.width,Canvas.height); //Oyun alanını Dikdörtgen şeklinde doldur. (x,y,width,height)

        //Snake
        CanvasContext.fillStyle="lime"; 
        for(var i=0; i<trail.length;i++){
            CanvasContext.fillRect(trail[i].x*GameSize,trail[i].y*GameSize,GameSize,GameSize); //(yeşil renk ile boyanacak yılanın birnevi x ve y kordinatları,width(GameSize=20px) ,height)
            if(trail[i].x==px&&trail[i].y==py){ //Yılan kendini yerse, oyun başa döner(Trail'in x'i o anki x konumuna(px) denk gelirse)
                tail=5; 
            
            }
        }
        trail.push({x:px,y:py})
        while(trail.length>tail){
            trail.shift(); //İlerleme durumunda ilk eklenen elemanı sileriz sona ekleriz
        }

        //Elma
        CanvasContext.fillStyle="red" 
        CanvasContext.fillRect(ax*GameSize,ay*GameSize,GameSize,GameSize);

        if(ax==px && ay==py){ //Elmanın konumu ile yılanın konumu eşit olursa ,yılan elmayı yer.
            tail++; //kuyruk uzar.
            ax=Math.floor(Math.random()*GameSize); //Elmayı ekranda Game size ölçüleri içerisinde rasst gele bir yere atmak için. 
            ay=Math.floor(Math.random()*GameSize); //1-20 arasında x ve y kordinatı rastgele oluşturulur
        }
    }
        //Tuş kombinasyonları
        function keyPush(e){
            if(e.keyCode==38 || e.keyCode==87){ //Yukarı tuşunun keyCodu 38 dir.
                xv=0; //x te herhangi bir değişiklik yok
                yv=-1; //Yılanın yukarı gidebilmesi için ,-1 ile yolunu ters çevirmiş oluruz
            } 
            if(e.keyCode==37 || e.keyCode==65){ //Sol tuşunun keyCodu 37 dir.
                xv=-1; //Yılanın sola gidebilmesi için ,-1 ile yolunu ters çevirmiş oluruz
                yv=0; 
            } 
            if(e.keyCode==40 || e.keyCode==83){ //Aşağı tuşunun keyCodu 40 dir.
                xv=0; //X de değişim yok
                yv=1; //Y nin yonü +1 yönünde
            } 
            if(e.keyCode==39 || e.keyCode==68){ //Sağ tuşunun keyCodu 39 dir.
                xv=1; //X in yonü +1 yönünde
                yv=0; //Y de değişim yok 
            } 
        }
    