var bombe=new Array();
let n=15;

$(document).ready(function () {
    let body=$("body");
    body.css("background-image", "radial-gradient(red, green, blue)");
    let header=$("<div id='header'></div>");
    let img=$("<img src=\"IMG/bandierina.png.aspx\"/>");
    header.append(img);
    let bomb=$("<h1 id='Bombe'>: 28</h1>");
    header.append(bomb);
    header.appendTo(body);
    creaTabella();

});

function creaTabella() {
    for(let i=0;i<28;i++)
    {
        let bom = Math.floor(Math.random() * (n));
        bom += " " + Math.floor(Math.random() * (n));
        if(!uscito(bom))
        {
            bombe[i]=bom;
        }
        else
        {
            i--;
        }
    }
    let prato=$('<div id="prato" class="prato"/>');
    let app=0;
    let k;
    prato.appendTo($("body"));
    for(let i=0;i<n;i++)
    {
        let riga=$("<tr id='riga"+i+"'></tr>");
        for(k=app;k<app+15;k++)
        {
            let cella = $("<th id='cella" + k + "'></th>");
            if(k % 2 == 1)
            {
                cella.css("background-color","rgb(70, 220, 70)");
            }
            else
            {
                cella.css("background-color","rgb(50, 195, 50)");
            }
            cella.click(function () {
                let s=$(this).css("backgroundImage").toString();
                if(!s.includes("bandierina"))
                controllaClick(this);
            });
            cella.contextmenu(function () {
               bandierina(this);
               return false;
            });

            let cont=0;
            let r=i;
            let c=k % 15;
            if(!bomba(r,c))
            {
                for(let j=r-1;j<r+2;j++)
                {
                    for(let x=c-1;x<c+2;x++)
                    {
                        if(bomba(j,x))
                        {
                            cont++;
                        }
                    }
                }
                cella.attr("class","cella"+" c"+cont);
            }
            else
            {
                cella.attr("class","cella bomba");
            }
            riga.append(cella);
        }
        app=k;
        prato.append(riga);
    }
}

function controllaClick(cella) {
        let color = $(cella).css("background-color").toString();
        if (color == "rgb(70, 220, 70)" || color == "rgb(50, 195, 50)") {
            let cls = $(cella).attr("class").toString();
            let s = cls.substring(6);
            if (s != "bomba") {
                if (s != "c0") {
                    $(cella).text(s.substring(1));
                }
                let num = cella.id.substring(5);
                if (num % 2 == 1) {
                    $(cella).css("backgroundColor", "rgb(160, 164, 96)");
                } else {
                    $(cella).css("backgroundColor", "rgb(150, 150, 106)");
                }
            }

            switch (s) {
                case "c0":
                    let c = cella.id.substring(5) % 15;
                    let r = cella.closest("tr").id.substring(4);
                    let j = r - 1;
                    let n = j + 3;
                    for (let i = j; i < n; i++) {
                        for (let k = c - 1; k < c + 2; k++) {
                            if (i >= 0 && i < 15 && k >= 0 && k < 15) {
                                let nome = i * 15 + k;
                                nome = "#cella" + nome;
                                let ogg = $(nome);
                                ogg.click();
                            }
                        }
                    }
                    break;
                case "c1":
                    $(cella).css("color", "darkred");
                    //$(cella).animate({color:"darkred"});  //ignora senza dare errori
                    break;
                case "c2":
                    $(cella).css("color", "green");
                    //$(cella).animate({color:"green"});
                    break;
                case "c3":
                    $(cella).css("color", "blue");
                    //$(cella).animate({color:"blue"});
                    break;
                case "c4":
                    $(cella).css("color", "black");
                    //$(cella).animate({color:"black"});
                    break;
                case "c5":
                    $(cella).css("color", "yellow");
                    //$(cella).animate({color:"yellow"});
                    break;
                case "c6":
                    $(cella).css("color", "blueviolet");
                    //$(cella).animate({color:"blueviolet"});
                    break;
                case "c7":
                    $(cella).css("color", "red");
                    //$(cella).animate({color:"red"});
                    break;
                case "c8":
                    $(cella).css("color", "darkgoldenrod");
                    //$(cella).animate({color:"darkgoldenrod"});
                    break;
                case "bomba":
                    $(cella).css('backgroundColor', 'darkred');
                    //$(cella).animate({color:"darkred"});
                    for (let i = 0; i < 225; i++) {
                        let cel = "#cella" + i;
                        $(cel).off("click");
                        if ($(cel).attr("class").toString() == "cella bomba") {
                            let s = $(cel).css("backgroundImage").toString();
                            if (s.includes("bandierina"))
                                $(cel).css('background-image', 'url("./IMG/mina.png")');
                        }
                    }
                    alert("Hai perso");
                    location.reload();
                    break;
            }
            if (s != "bomba") {
                controllaVittoria();
            }
        }
}

function controllaVittoria()
{
    let bool=true;
    for(let i=0;i<225;i++)
    {
        let cel="#cella"+i;
        if($(cel).attr("class").toString() != "cella bomba")
        {
            let color=$(cel).css("backgroundColor").toString();
            if(color=="rgb(70, 220, 70)"||color=="rgb(50, 195, 50)")
            {
                bool=false;
            }
        }
    }
    if(bool)
    {
        for(let i=0;i<225;i++)
        {
            let cel="#cella"+i;
            $(cel).off("click");
        }
        alert("Hai vinto!");
        location.reload();
    }
}

function bandierina(cella)
{
    let color=$(cella).css("background-color").toString();
    if(color=="rgb(70, 220, 70)"||color=="rgb(50, 195, 50)") {
        let s = $(cella).css("backgroundImage").toString();
        let num = $("#Bombe").text().toString().substring(1);
        if (s.includes("bandierina") /*s[0] == 'b'*/) {
            $(cella).css('background-image', 'none');
            let cont = ++num;
            $("#Bombe").text(": " + cont);
        } else {
            $(cella).css('background-image', 'url("./IMG/bandierina.png.aspx")');
            $("#Bombe").text(": " + (num - 1));
        }
    }
}

function bomba(r,c)
{
    let i=0;
    let num=r+" "+c;
    let bool=false;
    do {
        if(num==bombe[i])
            bool=true;
        else
            i++;
    }while (!bool&&i<bombe.length);
    return bool;
}

function uscito(num) {
    let i=0;
    let trovato=false;
    while(i < bombe.length && !trovato){
        if(bombe[i]==num)
        {
            trovato=true;
        }
        else
        {
            i++;
        }
    }
    return trovato;
}