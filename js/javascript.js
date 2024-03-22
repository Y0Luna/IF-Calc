window.onload = function () {
    // Marcar a opção "Anual" automaticamente
    document.getElementById("anual").checked = true;

    // Desabilitar os campos "Bimestre 3" e "Bimestre 4" quando selecionar "Semestral"
    document.getElementById("semestral").addEventListener("change", function () {
        if (this.checked) {
            document.getElementById("bimestre3").disabled = true;
            document.getElementById("bimestre4").disabled = true;
            document.getElementById("pesoBimestre2").textContent = "3";
        } else {
            document.getElementById("bimestre3").disabled = false;
            document.getElementById("bimestre4").disabled = false;
            document.getElementById("pesoBimestre2").textContent = "2";
        }
    });

    // Reativar os campos "Bimestre 3" e "Bimestre 4" quando selecionar "Anual"
    document.getElementById("anual").addEventListener("change", function () {
        if (this.checked) {
            document.getElementById("bimestre3").disabled = false;
            document.getElementById("bimestre4").disabled = false;
            document.getElementById("pesoBimestre2").textContent = "2";
        }
    });
}

// Função para calcular a média das notas
function calcularMedia() {
    // Obter os valores das notas dos bimestres e da prova final
    const notaBimestre1 = parseInt(document.getElementById("bimestre1").value) || 0;
    const notaBimestre2 = parseFloat(document.getElementById("bimestre2").value) || 0;
    const notaBimestre3 = parseFloat(document.getElementById("bimestre3").value) || 0;
    const notaBimestre4 = parseFloat(document.getElementById("bimestre4").value) || 0;
    const notaProvaFinal = parseFloat(document.getElementById("provaFinal").value) || 0;

    // Calcular a média ponderada dos bimestres
    let media;
    if (document.getElementById("semestral").checked) {
        media = (notaBimestre1 * 2 + notaBimestre2 * 3) / 5;
    } else {
        media = ((notaBimestre1 + notaBimestre2) * 2 + (notaBimestre3 + notaBimestre4) * 3) / 10;
    }

    // Calcular o valor que falta para atingir a média de 60
    const falta = Math.max(0, 60 - media);

    // Atualizar a média e o valor que falta na tabela
    document.getElementById("mediaNota").textContent = media.toFixed();
    document.getElementById("falta").textContent = falta.toFixed();

    // Atualizar a situação do aluno
    const situacaoAluno = document.getElementById("situacaoAluno");
    if (media < 20) {
        situacaoAluno.textContent = "Reprovado(a)";
        situacaoAluno.classList.remove("bg-warning", "bg-success");
        situacaoAluno.classList.add("bg-danger");
    } else if (media < 60) {
        situacaoAluno.textContent = "Prova Final";
        situacaoAluno.classList.remove("bg-danger", "bg-success");
        situacaoAluno.classList.add("bg-warning");
    } else {
        situacaoAluno.textContent = "Aprovado(a)";
        situacaoAluno.classList.remove("bg-danger", "bg-warning");
        situacaoAluno.classList.add("bg-success");
    }
}

// Associar a função de calcularMedia ao evento de clique no botão "Calcular"
document.getElementById("calcular").addEventListener("click", calcularMedia);

// Calculadora finalizada
