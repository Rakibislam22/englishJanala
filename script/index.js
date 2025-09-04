
const loadData = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(data => label(data.data));

}


// id
// : 
// 5
// level
// : 
// 1
// meaning
// : 
// "আগ্রহী"
// pronunciation
// : 
// "ইগার"
// word
// : 
// "Eager"

const selectLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(response => response.json())
    .then(data => displayWord(data.data) );
}

const displayWord = (word)=>{
    const container = document.getElementById('word-container');
    container.innerHTML = '';
    for(let w of word){
        const newelement = document.createElement('div');

        newelement.innerHTML = `
        <div class="bg-white p-7 space-y-4 text-center rounded-lg">
                    <h1 class="text-2xl font-medium">${w.word}</h1>
                    <p >Meaning /Pronounciation</p>
                    <h1 class="text-2xl font-semibold text-[#18181B]">"${w.meaning} / ${w.pronunciation}"</h1>
                    <div class="flex justify-between pt-8">
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `
        container.appendChild(newelement);
    }
}

const label =(data)=>{
    const container = document.getElementById('lesson');
    container.innerHTML = '';
    for(let lesson of data){
        container.innerHTML += `
        <button onclick="selectLesson(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png"
                                        alt=""> Lesson - ${lesson.level_no}</button>
        `
    }
}

loadData();