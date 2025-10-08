const form = document.querySelector('form')
const textArea = document.querySelector('textarea')
const htmlCode = document.getElementById('html-code')
const cssCode = document.getElementById('css-code')
const previeww = document.getElementById('preview-section')
const body = document.body
const html = document.documentElement

function setLoading(isLoading){
    const btnSpan = document.querySelector('#generate-btn')

    if(isLoading){
        btnSpan.innerHTML = 'Gerando Background...'
    }else{
        btnSpan.innerHTML = 'Gerar Background'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const description = textArea.value.trim()
        if(!description){
            return
        }

        setLoading(true)

        try {
            const response = await fetch('https://bruno04.app.n8n.cloud/webhook/gerador-de-background', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({description}),
            })

            const data = await response.json()
            htmlCode.textContent = data.code || "";
            cssCode.textContent = data.style || "";

            previeww.style.display = "block"
            previeww.innerHTML = data.code

            let styleTag = document.getElementById('dynamic-style')
            if(styleTag) styleTag.remove()

            if(data.style){
                styleTag = document.createElement('style')
                styleTag.id = 'dynamic-style'

                styleTag.textContent = data.style
                document.head.appendChild(styleTag)
            }

            body.style.background = "transparent"
            body.style.overflow = "auto"
            html.style.overflow = "auto"

            
        } catch (error) {
            console.error('Erro ao gerar o fundo: ', error)
            htmlCode.textContent = "Não consegui gerar o codigo HTML, tente novamente"
            cssCode.textContent = "Não consegui gerar o codigo CSS, tente novamente"
            previeww.innerHTML = ""

        }finally{
            setLoading(false)
        }

    })
})

