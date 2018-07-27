// Ejecuta tu test 

describe('loginUser', () => {
  it('es una funcion', () => {
    assert.isFunction(loginUser);
  it('debería permitir ingresar a usuario', () => {
    //assert.algoaquí(loginUser);
  })  
  });
});

describe('Debería permitir publicar', () => {
  it('es una funcion', () => {
    assert.isFunction(addingDataToNewsfeed);
  });
});

describe('Post debería ser del tipo string', () => {
  it('es del tipo string', ()=>{
    assert.equal(typeof addingDataToNewsfeed, 'string');
  });
});


