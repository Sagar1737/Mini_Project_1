const loadBtn = document.getElementById("loadBtn");
const resultContainer = document.getElementById("result");

function showMessage(msg, type = 'info'){
  resultContainer.innerHTML = `<div class="message ${type}">${msg}</div>`;
}

function renderItems(data){
  resultContainer.innerHTML = '';
  if(!data || data.length === 0){
    showMessage('No items returned from the server.', 'warning');
    return;
  }

  const frag = document.createDocumentFragment();
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-card';
    // format price to 2 decimals and include a badge
    const price = Number(item.price).toFixed(2);
    div.innerHTML = `<div style="display:flex;align-items:center;width:100%"><h3 style=\"margin:0\">${item.name}</h3><span class=\"price-badge\">$${price}</span></div><p style=\"margin-top:8px;color:#e6e6e6\">Item ID: ${item.id}</p>`;
    frag.appendChild(div);
  });
  resultContainer.appendChild(frag);
}

async function loadData(){
  if(!loadBtn) return;
  try{
    loadBtn.disabled = true;
    loadBtn.classList.add('loading');
    showMessage('Loading...', 'info');

    const res = await fetch('/api/items');
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderItems(data);
  }catch(err){
    console.error('Error fetching data:', err);
    showMessage('Failed to load items. Try again later.', 'error');
  }finally{
    if(loadBtn){
      loadBtn.disabled = false;
      loadBtn.classList.remove('loading');
    }
  }
}

if(loadBtn){
  loadBtn.addEventListener('click', loadData);
}
