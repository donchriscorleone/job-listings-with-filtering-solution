const main = document.getElementById('main');
const filterContainer = document.querySelector('.filter-container');
const filters = document.getElementById('filters');
const btnClear = document.getElementById('btn-clear');
let jobs = [];
let containerJobs = [];
let currentFilters = [];

window.addEventListener('load', (e) => {
    filterContainer.classList.add('display-none');

    jobs = getJobs();
    containerJobs = jobs;
    produceJobs(containerJobs);
})

btnClear.addEventListener('click', (e) => {
    containerJobs = jobs;
    currentFilters = [];
    while (filters.childNodes.length > 0) {
        filters.removeChild(filters.lastChild);
    }
    filterContainer.classList.add('display-none');
    main.classList.remove('active');
    filterJobs();
})

function produceJobs(jobs) {
    jobs.forEach(job => {
        job['tags'] = [job.role, job.level, ...job.languages, ...job.tools];
        
        main.append(createJobContainer(job))
    })
}

function createJobContainer(data) {
    const jobContainer = document.createElement('div');
    jobContainer.setAttribute('data-job', JSON.stringify(data));

    jobContainer.classList.add('job-container', 'container');
    jobContainer.setAttribute('data-type', data.featured ? 'featured' : '');

    const companyImage = document.createElement('div');
    companyImage.classList.add('company-image');
    const img = document.createElement('img');
    img.setAttribute('src', data.logo);
    img.setAttribute('alt', `An image of ${data.company}`);
    companyImage.append(img);

    jobContainer.append(companyImage);
    jobContainer.append(createJobCard(data));
    jobContainer.append(createJobFilters(data))

    return jobContainer;
}

function createJobCard(data) {
    const card = document.createElement('div');
    card.classList.add('job-card', 'flex');

    card.append(createCardHeader(data));
    card.append(createCardBody(data));
    card.append(createCardFooter(data));

    return card;
}

function createCardHeader(data) {
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const company = document.createElement('span');
    company.classList.add('company');
    company.innerText = data.company;

    cardHeader.append(company);

    Object.keys(data).filter(d => d === 'new' || d === 'featured').forEach(d => {
        if (data[d]) {
            const span = document.createElement('span');
            span.classList.add('pill');
            span.innerText = d === 'new' ? `${d}!` : d;
            span.setAttribute('data-color', d === 'new' ? 'primary' : 'neutral');
            cardHeader.append(span);
        }
    })

    return cardHeader;
}

function createCardBody(data) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const a = document.createElement('a');
    a.classList.add('job-title');
    a.setAttribute('target', '_blank')
    a.setAttribute('href', '#');
    a.innerText = data.position;

    cardBody.append(a);
    return cardBody;
}

function createCardFooter(data) {
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer')
    const cardList = document.createElement('ul');
    cardList.classList.add('list');

    Object.keys(data).filter(x => x === 'postedAt' 
        || x === 'contact' 
        || x === 'location').forEach(key => {
            const li = document.createElement('li');
            li.innerText = data[key];
            cardList.append(li);
        })

    cardFooter.append(cardList);
    return cardFooter;
}

function createJobFilters(data) {
    const cardFilters = document.createElement('div');
    cardFilters.classList.add('filters');

    (data.tags ?? []).forEach(l => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.setAttribute('data-color', 'primary');
        btn.innerText = l;
        btn.addEventListener('click', (e) => {
            if (!currentFilters.includes(l)) {
                filterContainer.classList.remove('display-none');
                filters.append(createFilterInput(data, l));
                main.classList.add('active');
                currentFilters.push(l);
                filterJobs();
            }
        })
        cardFilters.appendChild(btn);
    })

    return cardFilters;
    
}

function createFilterInput(data, filterText) {
    const filter = document.createElement('div');
    filter.setAttribute('id', filterText);
    filter.classList.add('filter');

    const span = document.createElement('span');
    span.innerText = filterText;
    span.classList.add('filter-text');

    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.setAttribute('data-type', 'icon')
    btn.setAttribute('aria-label', 'Remove icon');

    btn.addEventListener('click', (e) => {
        filters.removeChild(filter);
        currentFilters = currentFilters.filter(x => x !== filterText);
        filterJobs();

        if (filters.children.length == 0) {
            filterContainer.classList.add('display-none');
            main.classList.remove('active');
        }
    })

    filter.append(span);
    filter.append(btn);
    return filter
}

function filterJobs() {
    containerJobs = jobs.filter(j => {
        const tags = j.tags.filter(t => {
            if (currentFilters.length > 0)
                return currentFilters.includes(t);

            return t
        })

        return tags.length > 0;
    })

    console.warn(containerJobs)
    console.warn(main.childNodes)

    while (main.childNodes.length > 1) {
        main.removeChild(main.lastChild);
    }

    produceJobs(containerJobs);
}

function getJobs() {
    return [
        {
          "id": 1,
          "company": "Photosnap",
          "logo": "./images/photosnap.svg",
          "new": true,
          "featured": true,
          "position": "Senior Frontend Developer",
          "role": "Frontend",
          "level": "Senior",
          "postedAt": "1d ago",
          "contract": "Full Time",
          "location": "USA Only",
          "languages": ["HTML", "CSS", "JavaScript"],
          "tools": []
        },
        {
          "id": 2,
          "company": "Manage",
          "logo": "./images/manage.svg",
          "new": true,
          "featured": true,
          "position": "Fullstack Developer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "1d ago",
          "contract": "Part Time",
          "location": "Remote",
          "languages": ["Python"],
          "tools": ["React"]
        },
        {
          "id": 3,
          "company": "Account",
          "logo": "./images/account.svg",
          "new": true,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2d ago",
          "contract": "Part Time",
          "location": "USA Only",
          "languages": ["JavaScript"],
          "tools": ["React", "Sass"]
        },
        {
          "id": 4,
          "company": "MyHome",
          "logo": "./images/myhome.svg",
          "new": false,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "5d ago",
          "contract": "Contract",
          "location": "USA Only",
          "languages": ["CSS", "JavaScript"],
          "tools": []
        },
        {
          "id": 5,
          "company": "Loop Studios",
          "logo": "./images/loop-studios.svg",
          "new": false,
          "featured": false,
          "position": "Software Engineer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "1w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["JavaScript"],
          "tools": ["Ruby", "Sass"]
        },
        {
          "id": 6,
          "company": "FaceIt",
          "logo": "./images/faceit.svg",
          "new": false,
          "featured": false,
          "position": "Junior Backend Developer",
          "role": "Backend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "UK Only",
          "languages": ["Ruby"],
          "tools": ["RoR"]
        },
        {
          "id": 7,
          "company": "Shortly",
          "logo": "./images/shortly.svg",
          "new": false,
          "featured": false,
          "position": "Junior Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["HTML", "JavaScript"],
          "tools": ["Sass"]
        },
        {
          "id": 8,
          "company": "Insure",
          "logo": "./images/insure.svg",
          "new": false,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "USA Only",
          "languages": ["JavaScript"],
          "tools": ["Vue", "Sass"]
        },
        {
          "id": 9,
          "company": "Eyecam Co.",
          "logo": "./images/eyecam-co.svg",
          "new": false,
          "featured": false,
          "position": "Full Stack Engineer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "3w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["JavaScript", "Python"],
          "tools": ["Django"]
        },
        {
          "id": 10,
          "company": "The Air Filter Company",
          "logo": "./images/the-air-filter-company.svg",
          "new": false,
          "featured": false,
          "position": "Front-end Dev",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "1mo ago",
          "contract": "Part Time",
          "location": "Worldwide",
          "languages": ["JavaScript"],
          "tools": ["React", "Sass"]
        }
      ]
}