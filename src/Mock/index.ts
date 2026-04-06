const estoque = {

empresa: {
  nome: "Metodo 12P",
  proprietario: "Metodo 12P",
  descricao: "A Metodo 12P é uma empresa especializada na importação e distribuição de produtos tecnológicos e utilidades com alto potencial de venda no mercado brasileiro.",
  
  sobre: "Fundada com o objetivo de facilitar o acesso a produtos inovadores e lucrativos, a Metodo 12P atua na curadoria de fornecedores internacionais, garantindo qualidade, custo competitivo e oportunidades reais de margem para revendedores e clientes finais. Nosso foco é oferecer soluções inteligentes, produtos atualizados e um atendimento eficiente, ajudando nossos clientes a vender mais e melhor.",

  endereco: {
    rua: "Av. Paulista, 1500",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-200",
    pais: "Brasil"
  },

  contato: {
    email: "contato@metodo12p.com",
    whatsapp: "+55 11 99999-9999"
  },

  identidadeIA: {
    tom: "profissional e vendedor",
    objetivo: "ajudar clientes a escolher produtos e aumentar vendas"
  }
},

  fornecedores: [
    {
      id: 1,
      nome: "Shenzhen Tech Co.",
      pais: "China",
      localizacao: {
        cidade: "Shenzhen",
        endereco: "Nanshan District, Tech Park"
      },
      contato: {
        email: "contato@shenzhentech.com",
        telefone: "+86 755 1234-5678",
        whatsapp: "+86 138 0000-0000"
      },
      produtos: [
        {
          id: 101,
          nome: "Fone Bluetooth TWS",
          categoria: "Eletrônicos",
          preco_custo: 18.5,
          preco_venda: 49.9,
          quantidade: 120,
          sku: "SZ001"
        },
        {
          id: 102,
          nome: "Smartwatch X8",
          categoria: "Eletrônicos",
          preco_custo: 25.0,
          preco_venda: 79.9,
          quantidade: 80,
          sku: "SZ002"
        },
        {
          id: 103,
          nome: "Power Bank 20000mAh",
          categoria: "Eletrônicos",
          preco_custo: 30.0,
          preco_venda: 89.9,
          quantidade: 95,
          sku: "SZ003"
        },
        {
          id: 104,
          nome: "Caixa de Som Bluetooth",
          categoria: "Eletrônicos",
          preco_custo: 20.0,
          preco_venda: 59.9,
          quantidade: 110,
          sku: "SZ004"
        },
        {
          id: 105,
          nome: "Teclado Mecânico RGB",
          categoria: "Eletrônicos",
          preco_custo: 35.0,
          preco_venda: 119.9,
          quantidade: 60,
          sku: "SZ005"
        }
      ]
    },
    {
      id: 2,
      nome: "Guangzhou Accessories Ltd.",
      pais: "China",
      localizacao: {
        cidade: "Guangzhou",
        endereco: "Tianhe District, Electronics Market"
      },
      contato: {
        email: "sales@guangzhouacc.com",
        telefone: "+86 20 8765-4321",
        whatsapp: "+86 139 1111-1111"
      },
      produtos: [
        {
          id: 201,
          nome: "Cabo USB-C 1m",
          categoria: "Acessórios",
          preco_custo: 4.5,
          preco_venda: 14.9,
          quantidade: 300,
          sku: "GZ001"
        },
        {
          id: 202,
          nome: "Carregador Turbo USB-C",
          categoria: "Acessórios",
          preco_custo: 12.0,
          preco_venda: 34.9,
          quantidade: 200,
          sku: "GZ002"
        },
        {
          id: 203,
          nome: "Hub USB 4 portas",
          categoria: "Acessórios",
          preco_custo: 8.0,
          preco_venda: 24.9,
          quantidade: 180,
          sku: "GZ003"
        },
        {
          id: 204,
          nome: "Suporte para Celular",
          categoria: "Acessórios",
          preco_custo: 3.0,
          preco_venda: 12.9,
          quantidade: 250,
          sku: "GZ004"
        },
        {
          id: 205,
          nome: "Mouse Gamer RGB",
          categoria: "Acessórios",
          preco_custo: 9.0,
          preco_venda: 29.9,
          quantidade: 140,
          sku: "GZ005"
        }
      ]
    },
    {
      id: 3,
      nome: "Yiwu Gadgets Factory",
      pais: "China",
      localizacao: {
        cidade: "Yiwu",
        endereco: "International Trade City"
      },
      contato: {
        email: "contato@yiwugadgets.com",
        telefone: "+86 579 2222-3333",
        whatsapp: "+86 137 2222-2222"
      },
      produtos: [
        {
          id: 301,
          nome: "Ring Light 10 polegadas",
          categoria: "Iluminação",
          preco_custo: 15.0,
          preco_venda: 45.9,
          quantidade: 70,
          sku: "YW001"
        },
        {
          id: 302,
          nome: "Tripé Ajustável",
          categoria: "Acessórios",
          preco_custo: 10.0,
          preco_venda: 29.9,
          quantidade: 150,
          sku: "YW002"
        },
        {
          id: 303,
          nome: "Mini Ventilador USB",
          categoria: "Utilidades",
          preco_custo: 7.0,
          preco_venda: 22.9,
          quantidade: 130,
          sku: "YW003"
        },
        {
          id: 304,
          nome: "Luminária LED de Mesa",
          categoria: "Iluminação",
          preco_custo: 12.0,
          preco_venda: 39.9,
          quantidade: 90,
          sku: "YW004"
        },
        {
          id: 305,
          nome: "Suporte Notebook Ajustável",
          categoria: "Utilidades",
          preco_custo: 11.0,
          preco_venda: 34.9,
          quantidade: 85,
          sku: "YW005"
        }
      ]
    }
  ]
}

export default estoque;