export function trackIframeReader(onChnage: (parent: HTMLElement) => void) {
  const iframe = getFileIframe();

  if (!iframe || !iframe.contentDocument || !iframe.contentWindow) {
    return () => {};
  }

  const observer = new MutationObserver((mutationsList) => {
    const mutation = mutationsList.find(i => i.target.parentElement);

    if (!mutation)
      return;

    onChnage(mutation.target.parentElement!);
  });

  // Start observing
  observer.observe(iframe.contentDocument.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class'] // Monitor changes on the class attribute
  });

  return ()=>{ observer.disconnect();}
}

export function replaceRelativePath(content: string): string {
  const baseUrl = 'https://www.bookport.cz';
  const regex = /(["'])\/api\/reader\//g;
  return content.replace(regex, `$1${baseUrl}/api/reader/`);
}

export function getFileIframe() {
  return document.getElementById('file-iframe') as HTMLIFrameElement;
}

  export function scrollToDomPath(document: Document | null, domPath?: string) {
    if (!document || !domPath)
      return;

    const element = document.querySelector(domPath);

    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }
  

export function getDomElementPath(el: HTMLElement){
  if (!el) {
    return;
  }

  const stack = [];
  let levelCount = 0;
  let nearestElemWithId = null;

  let sibParent;
  let sibSiblings;

  do {
  	levelCount++;

    let sibCount = 0;
    let sibIndex = 0;
    sibParent = el?.parentNode;
    sibSiblings = sibParent?.children;

    if ( sibSiblings ){
    	sibSiblings = Array.from(sibSiblings).filter( sibElem => el.nodeName == sibElem.nodeName );
    }

    // Iterate over the childNodes of the elements parentNode to get the
    // index to use
    if ( sibSiblings ){
	    for ( let i = 0; i < sibSiblings.length; i++ ) {
	      let sib = sibSiblings[i];

	      //if ( sib.nodeName != el.nodeName )  continue;
	      
	        sibCount++;

	        if ( sib === el ) {
	          // If this is the correct element, then save the sibIndex
	          // and stop looping
	          sibIndex = sibCount;
	          break;
	        }
	    }
	  }

    if ( el && el.hasAttribute('id') && el.id != '' ) {
      nearestElemWithId = el.id;

      // Turns out, if you have an id that starts with a numerical value, then you can't
      // use it in querySelector[All] unless you either escape it or add [id=] to it.
      if ( /^[0-9]/.test(el.id) ){
      	stack.unshift(`[id="${el.id}"]`);
      }
      else {
      	stack.unshift(`#${el.id}`);
      }
    } 
    else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':nth-of-type(' + sibIndex + ')');
    } 
    else {
      stack.unshift(el.nodeName.toLowerCase());
    }

    el = sibParent as any;
  }
  while( sibParent?.nodeType === Node.ELEMENT_NODE && nearestElemWithId === null );

  if ( stack[0] === 'html' )
  	stack.shift();

  return stack.join(' > ');
}