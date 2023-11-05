var e={};const t=new(0,{}.PixabayAPI);document.querySelector(".search-form").addEventListener("submit",(async r=>{r.preventDefault();const a=new FormData(r.target).get("searchQuery");if(!a)return;t.query=a,t.page=1;const n=await t.fetchPhotos();(0,e.renderGallery)(n)}));
//# sourceMappingURL=index.2afcf1bf.js.map
