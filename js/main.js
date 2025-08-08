const products = [
  { id:1, name:'صاك كروكو 3 قطع', category:'حقائب', price:2300, variants:['افتراضي'], image:'assets/products/croco3set.png' },
  { id:2, name:'باك لي ساك قطعتين', category:'حقائب', price:1700, variants:['أسود','أخضر','بني'], image:'assets/products/2piecespack.png' },
  { id:3, name:'بثلاث قطع GUESS باك لي ساك من علامة', category:'حقائب', price:2900, variants:['افتراضي'], image:'assets/products/guess3set.png' }
];

const fmt = (n) => 'DA ' + (n||0).toLocaleString('en-DZ', {minimumFractionDigits:2, maximumFractionDigits:2});

function renderProducts(){
  const wrap = document.getElementById('productList'); if(!wrap) return;
  const cat = document.getElementById('filterCategory')?.value || '';
  const col = document.getElementById('filterColor')?.value || '';
  wrap.innerHTML = '';

  products
    .filter(p => (!cat || p.category===cat) && (!col || p.variants.includes(col)))
    .forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="media"><img src="${p.image}" alt="${p.name}"></div>
        <div class="product-body">
          <h3 class="product-title">${p.name}</h3>
          <div class="price">${fmt(p.price)}</div>
          <div class="row">
            <select id="variant-${p.id}" class="select">
              ${p.variants.map(v=>`<option value="${v}">${v}</option>`).join('')}
            </select>
            <button class="btn" onclick="goToCheckout(${p.id})">اكمال الطلبية</button>
          </div>
        </div>`;
      wrap.appendChild(card);
    });
}

function goToCheckout(id){
  const product = products.find(p=>p.id===id); if(!product) return;
  const variant = document.getElementById(`variant-${id}`)?.value || product.variants[0];
  localStorage.setItem('selectedProduct', JSON.stringify({ id:product.id, name:product.name, price:product.price, variant }));
  location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('productList')){
    document.getElementById('filterCategory').addEventListener('change', renderProducts);
    document.getElementById('filterColor').addEventListener('change', renderProducts);
    renderProducts();
  }
});
