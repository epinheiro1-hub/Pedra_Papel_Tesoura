from flask import Flask, render_template, request, jsonify



app=Flask(__name__)

jogadas = {"jogador1": None, "jogador2": None}
atual = "jogador1"

#Página inicial
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/jogar", methods=["POST"])
def jogar():
    global atual
    escolha = request.json.get("escolha")
    global jogadas
    jogadas[atual] = escolha
#Verificando quem ganhou
    if atual == "jogador1":
        atual = "jogador2"
        return jsonify({"mensagem": "Jogador 2, sua vez!"})
    else:
        # Verifica resultado
        j1, j2 = jogadas["jogador1"], jogadas["jogador2"]
        if j1 == j2:
            resultado = "Empate!"
        elif (j1 == "pedra" and j2 == "tesoura") or \
             (j1 == "papel" and j2 == "pedra") or \
             (j1 == "tesoura" and j2 == "papel"):
            resultado = "Jogador 1 venceu!"
        else:
            resultado = "Jogador 2 venceu!"
        jogadas["jogador1"] = None
        jogadas["jogador2"] = None
        atual = "jogador1"
        return jsonify({
            "mensagem": f"Jogador 1 escolheu {j1}, Jogador 2 escolheu {j2}. {resultado}"
        })
#Recebe as duas jogadas e devolve o resultado
if __name__ == '__main__':
    app.run(debug=True)

    

