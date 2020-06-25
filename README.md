Compilar

Para compilar o programa do aplicativo deve se ter instalado tanto o flutter, quanto o Android studio (foi utilizado como aparelho o Pixel 2 api 27)
O usuário deve entrar na pasta do aplicativo pelo cmd e digitar "flutter run" ou deixar configurado para utilizar pelo vscode, onde será necessário baixar a extensão dart

Tanto por questões de segurança, o app tem acesso direto ao banco de dados, quanto pelo tamanho, aproximadamente 500 mb, não colocou o aplicativo inteiro no Git.
Para se ter acesso ao aplicativo pode baixar o app no seguinte link do drive:

https://drive.google.com/file/d/1317MSbaqIn3CfN683EwvTTlGwPi6UCT4/view?usp=sharing

Além disso teve que alterar uma das bibliotecas utilizadas, o que pode causar algumas dificuldades caso pegue o código do git, o que pode ser solucionado caso seja baixado diretamente pelo drive.


Para realizar os testes, a senha utilizada em todos os usuários é senha1234 e o usuário padrão é o pac1@email.com


Instruções de usuário

O uso do aplicativo é simples: 
1- Primeiramente o usuário deve logar com a conta criada anteriormente pelo profissional da saúde.
2- Após isso o usuário deve ir em "configurações" e clicar no botão "autorizar fitbit", isso ira redirecionar o usuário para a página do fitbit
3- O usuário se cadastra no fitbit e aceita os termos, onde o aplicativo pode pegar os dados do usuário do fitbit.
4- Após isso o usuário é livre para utilizar qualquer funcionalidade do aplicativo, que é:
	A pagina de exercícios, que traz algumas dicas de exercícios e algumas recomendações
	O FAQ que responde diversas perguntas que o usuário pode ter
	O histórico que mostra um gráfico tanto de meta quanto de passos andado
	Meta diária que mostra a meta atual do usuário e a quantidade de passos que ele já fez
	Diário que apresenta um questionário, onde o usuário deve responder todos os dias. Na implementação, uma vez por semana (quarta), o app irá apresentar um questionário semanal para o paciente com informações que podem ajudar o profissional de saúde.
