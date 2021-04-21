(() => {
    const container = document.querySelector('.container');
    let randomFileName = [];
    const reloadBtn = document.querySelector('.reload');
    const body = document.querySelector('body');
    const fileName = [
        {
            id: 0,
            fileName : "1.png",
            english : ["name", "Name"],
            korea: "이름"
        },
        {
            id: 0,
            fileName : "2.jpeg",
            english : ["meet", "Meet"],
            korea: "만나다"
        },
        {
            id: 0,
            fileName : "father.jpeg",
            english : ["father", "Father"],
            korea: "아빠"
        },
        {
            id: 0,
            fileName : "3.png",
            english : ["friend", "Friend"],
            korea: "친구"
        },
        {
            id: 0,
            fileName : "48758630.jpeg",
            english : ["grandfather", "Grandfather"],
            korea: "할아버지"
        },
        {
            id: 0,
            fileName : "mother.jpeg",
            english : ["mother", "Mother"],
            korea: "엄마"
        },
        {
            id: 0,
            fileName : "34562504.jpeg",
            english : ["grandmother", "Grandmother"],
            korea: "할머니"
        },
        {
            id: 0,
            fileName : "teacher-illustration.png",
            english : ["teacher", "Teacher"],
            korea: "선생님"
        }
    ];
    let backgroundImgList = [];
    let check = [];
    const kor = document.querySelector('.korea');
    const eng = document.querySelector('.english');
    const modal = document.querySelector('.modal');
    for(let i = 0; i < length; i++){
        check.push(0);
    }
    reload();

    window.addEventListener('resize', () => {
        document.body.style.backgroundSize = `${document.body.clientWidth}px ${document.body.clientHeight}px`;
    })

    for(let i = 0; i < fileName.length; i++) {
        const card = document.createElement('div');
        card.className = `card item${i+1}`
        card.dataset.id = i;
        card.style.backgroundImage = `url(img/${randomFileName[i].fileName})`;
        container.append(card);

    }


    reloadBtn.addEventListener('click', reload);

    function reload() {
        if (!Array.isArray(randomFileName) || randomFileName.length !== 0)
            randomFileName = [];
        let length = fileName.length;
        let idx = 0;
        while(idx < length) {

            let random = Math.random()*length;
            random = Math.floor(random);
            if(check[random] === 1) continue;
            randomFileName.push(fileName[random]);
            idx++;
            check[random] = 1;
        }
    }

    function readTextFile(file) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    backgroundImgList = rawFile.responseText.split("\n");
                }
            }
        };
        rawFile.send(null);
    }

    let idx = 0;
    function selectBackImg() {
        body.style.backgroundImage = `url(img/background/${backgroundImgList[idx++]})`
        body.style.backgroundSize = `100% 100%`;
        body.style.backgroundRepeat = `no-repeat`;
    }

    container.addEventListener('click', (e) => {
        if(!e.target.classList.contains('card')) return;
        let id = e.target.getAttribute("data-id");
        modal.classList.toggle('hide');
        modal.style.display = 'flex';
        eng.innerHTML = `영어 : ${randomFileName[id*1].english[0]}`;
        kor.innerHTML = `한글 : ${randomFileName[id*1].korea}`;

    })

    readTextFile("file/out.txt");
    setInterval(selectBackImg, 5000);


})();