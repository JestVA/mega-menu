// selects anchor tags from top navigation menu
let topMenu = $('.cd-top-nav-list > li > a');
topMenu.map(x => {
    let atag = $(topMenu[x]);
    let lis = atag.next().find('ul > li > ul > li > span');
    let secondMenuTitle = '';
    let secondMenuItemList = [];
    if (lis[0]) {
      secondMenuTitle = lis[0].innerText.trim();
      
      for (i = 1; i < lis.length; i++) {
        let lis2 = $(lis[i]).next().find('div > div');
        let ul1 = lis2.next();
        let ul2 = ul1.next();
        let list1 = [], list2 = [];
        //console.log(lis2, ul1, ul2);
        if (ul1[0]) {
          let ul1List = $(ul1[0]).find('li > a');
          ul1List.map(x => list1.push({
            label: ul1List[x].innerText.trim(), 
            bold: $(ul1List[x]).hasClass('main'),
            link: ul1List[x].href.replace('https://www.chemistdirect.co.uk/', '')
          }));
        }
        if (ul2[0]) {
          let ul2List = $(ul2[0]).find('li > a');
          ul2List.map(x => list2.push({
            label: ul2List[x].innerText.trim(), 
            bold: $(ul2List[x]).hasClass('main'),
            link: ul2List[x].href.replace('https://www.chemistdirect.co.uk/', '')
          }));
        }
        secondMenuItemList.push({
          label: lis[i].innerText.trim(),
          title: lis2[0].innerText.trim(),
          list1,
          list2
        });
      }
    }
  
    return {id: atag.data('id'), label: topMenu[x].innerText, secondMenuTitle, secondMenuItemList}
  }).toArray();