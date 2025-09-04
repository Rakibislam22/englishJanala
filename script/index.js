// featch lesson label
const loadData = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(data => label(data.data));

}

// featch lesson word
const selectLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(response => response.json())
    .then(data =>{
        const previousActive = document.querySelectorAll('.active');
        previousActive.forEach(element => {
            element.classList.remove('active');
        });

        document.getElementById(`lesson-${id}`).classList.add('active');

        displayWord(data.data) ;
    });
    
}

// load word info in modal
const loadWordInfo = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(response => response.json())
    .then(data => {
        const modal = document.getElementById('modal-content');
        modal.innerHTML = `
            <div>
                <h1 class="text-2xl font-bold">${data.data.word}  (<i class="fa-solid fa-microphone-lines"></i>: ${data.data.pronunciation})</h1>
            </div>
            <div class="pt-4">
                <h3 class="py-1 font-bold">Meaning  </h3>
                <p class="py-1">${data.data.meaning}</p>
            </div>
            <div>
            
            </div>
            <div class="pt-4">
                <h3 class="py-1 font-bold">Example</h3> 
                <p class="py-1">${data.data.sentence}</p>
            </div>

            <div class="pt-4">
                <h3 class="py-1 bangla font-bold">সমার্থক শব্দ গুলো</h3>
                <div class="flex flex-wrap gap-2 pt-2">
                    ${(data.data.synonyms.length > 0) ? data.data.synonyms.map(syn => `<button class="btn">${syn}</button>`).join('') : '<p class="bangla">সমার্থক শব্দ পাওয়া যায়নি</p>'}
                </div>
            </div>
            
            
        `;
        my_modal_5.showModal();
    });
}

// display lesson word
const displayWord = (word)=>{
    const container = document.getElementById('word-container');
    container.innerHTML = '';

    if(word.length === 0){
        container.innerHTML = `
   
        <div class="py-8 space-y-4 text-center col-span-full">
            <img src="assets/alert-error.png" alt="" class="mx-auto ">
            <p class="bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।।</p>
            <h1 class="text-3xl text-[#292524] font-medium bangla">নেক্সট Lesson এ যান</h1>
        </div>
    
        `;
    }

    for(let w of word){
        const newelement = document.createElement('div');

        newelement.innerHTML = `
        <div class="bg-white p-7 space-y-4 text-center rounded-lg">
                    <h1 class="text-2xl font-medium">${(w.word) ? w.word : 'Word পাওয়া যায়নি'}</h1>
                    <p >Meaning /Pronounciation</p>
                    <h1 class="text-2xl font-semibold text-[#18181B]">"${(w.meaning) ? w.meaning : 'অর্থ পাওয়া যায়নি'} / ${(w.pronunciation) ? w.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</h1>
                    <div class="flex justify-between pt-8">
                        <button onclick="loadWordInfo(${w.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `
        container.appendChild(newelement);
    }
}

// display lesson label
const label =(data)=>{
    const container = document.getElementById('lesson');
    container.innerHTML = '';
    for(let lesson of data){
        container.innerHTML += `
        <button id="lesson-${lesson.level_no}" onclick="selectLesson(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png"
                                        alt=""> Lesson - ${lesson.level_no}</button>
        `
    }
}

// initial call
loadData();