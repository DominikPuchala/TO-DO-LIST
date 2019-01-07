var items = JSON.parse(localStorage.getItem('items')) || [];
const itemsList = document.querySelector('#list');
const addItem = document.querySelector('#list--menu__add');
const removeItem = document.querySelector('#list--menu__remove');
const selectAllItems = document.querySelector('#list--menu__selectAll');
const navList = document.querySelector('#main--nav__list');
const buttonBack = document.querySelector('#button--back');
let lastChecked;

function add()
{
    const menuText = document.querySelector('#list--menu__text');
    if(menuText.value!="")
    {
        const item = {
            text: menuText.value,
            done: false
        };
        items.push(item);        
        uptadeList();    
        isAllSelected();
        menuText.value='';
    }
}

function toggleDone(e)
{
    if(e.target.matches('input'))
    {
        const index = e.target.dataset.index;
        items[index].done = !items[index].done;
        isAllSelected();
        uptadeList();
    }   
}

function remove()
{
    for(let i = 0;i<items.length;i++)
    {   
        if(items[i].done)
        {
            items.splice(i,1);
            i--;
        }
    }
    uptadeList();
}

function selectAll()
{
    let isSelected = isAllSelected();
    
    if(isSelected==false)
    {
        items.forEach(item => {
            item.done=true;
        }); 
    }
    else
    {
        items.forEach(item => {
            item.done=false;
        });
    }
    
    uptadeList();
    isAllSelected();
}

function selectShift(e)
{
    if(!e.target.matches('input')) return;
 
    const inputsList = document.querySelectorAll('input[type="checkbox"]'); 
    let between = false;
    if(e.shiftKey && e.target.checked)
    {
        inputsList.forEach(input =>
            {
                if(input.id === e.target.id || input.id === lastChecked.id)
                {
                    between = !between;
                }
              
                if(between)
                items[input.dataset.index].done=true;
            })
    }

    lastChecked = e.target;

    isAllSelected();
    uptadeList();
}

function isAllSelected()
{
    let isSelected = true;
    for(let i = 0;i<items.length;i++)
    {
        if(items[i].done==false)
        {
            isSelected = false;
            break;
        }
    }

    if(isSelected) selectAllItems.value="Odznacz wszystkie";
    else selectAllItems.value="Zaznacz wszystkie";
    
    return isSelected;
}

function uptadeList()
{
    itemsList.innerHTML = items.map((item,i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}>
                <label for="item${i}">${item.text}</label>
            </li>
        `
    }).join('');

    localStorage.setItem('items', JSON.stringify(items));
}

function changeMainContent(e)
{
    
    if(!e.target.matches('li')) return
    const navListItems = navList.querySelectorAll('li');
    navListItems.forEach(item => {
        item.classList.remove('main--nav__active');
    });
    e.target.classList.add('main--nav__active');

    const list = document.querySelector('#list--container');
    const author = document.querySelector('#about--container');
    const helpdesk = document.querySelector('#helpdesk--container');

    switch(e.target.dataset.li)
    {
        default:
        {
            list.style.display='block';
            author.style.display='none';
            helpdesk.style.display='none';
            break;
        }

        case '1':
        {
            list.style.display='block';
            author.style.display='none';
            helpdesk.style.display='none';
            break;
        }

        case '2':
        {
            list.style.display='none';
            author.style.display='block';
            helpdesk.style.display='none';
            break;
        }

        case '3':
        {
            list.style.display='none';
            author.style.display='none';
            helpdesk.style.display='block';
            break;
        }
    }
}

function movePageUp()
{
    let scrollToTop = window.setInterval(function()
        {
            let pageHeight = pageYOffset;
            if(pageHeight > 0)
            {
                window.scrollTo(pageXOffset,pageHeight - 20)
            }
            else
            {
                window.clearInterval(scrollToTop);
            }
        }, 10)
 
}

function toggleButton()
{
    if(pageYOffset>=300)
    {
        buttonBack.style.display='block';
    }
    else
    {
        buttonBack.style.display='none';
    }
}



uptadeList();
isAllSelected();

addItem.addEventListener('click', add, false);
itemsList.addEventListener('click',toggleDone, false);
itemsList.addEventListener('click', selectShift, false);
removeItem.addEventListener('click', remove, false);
selectAllItems.addEventListener('click', selectAll, false);
navList.addEventListener('click', changeMainContent, false);
buttonBack.addEventListener('click', movePageUp, false);
window.addEventListener('scroll', toggleButton, false)
