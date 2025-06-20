export function jsx(html, ...args) {
    return html.slice(1).reduce((str, elem, i) => str + args[i] + elem, html[0]);
}

export async function loadConfig(path) {
    const resp = await fetch(path);
    return await resp.json();
}

export default async function decorate(block) {
    const pathElement = block.querySelector('a');

    if(pathElement) {
        var finalHTML = '';
        const path = pathElement.getAttribute('href');

        finalHTML += jsx`
        <div class="alert alert-success col-12">
          Managing <a href="${path}">headless content</a> from Excel
        </div>
        `;

        const jsonConfig  = await loadConfig(path);

        jsonConfig.data.map(function(item, index){
            var timestamp = index;
            var DMLink = '';
            var DMLinkParams = '';
            var DMLinkPreviewParams = '';

            for (const property in item) {
                if(property=='template_url') {
                    DMLink = item[property] + '?';
                } else {
                    if(property!='wid') {
                        DMLinkPreviewParams += `&${property}=${encodeURIComponent(item[property])}`;
                    }

                    DMLinkParams += `&${property}=${encodeURIComponent(item[property])}`;
                }
                
            }

            finalHTML += jsx`
            <div class="col-4">
                <div class="card">
                    <img class="img-fluid" src="${item.product_thumbnail_url}" role="button" data-bs-toggle="modal" data-bs-target="#${timestamp}" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${item.product_name} <span class="badge rounded-pill text-bg-secondary">${item.category_name}</span></h5>
                      <p class="card-text">${item.product_short_description}</p>
                      <span class="badge text-bg-success fs-6">${item.product_price} ${item.product_currency}</span>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="${timestamp}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <img src="${item.product_thumbnail_url}" class="mx-auto d-block" alt="" />
                </div>
            </div>
            `;
        })

        block.classList.add('row', 'gy-3');
        block.innerHTML = finalHTML;
    }
  }
  