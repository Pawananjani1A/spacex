%{
#include<stdio.h>
#include<stdlib.h>
int yylex();
void yyerror();
%}
%token A B C D NEWLINE
%%
stmt: S NEWLINE { printf("Valid!!");
return 1;
}
;
S: X Y
;
X: A X B
|
;
Y: C Y D
|
;
%%
void main()
{
printf("Enter an expression : ");
yyparse();
}
void yyerror() {
printf("Invalid!!");
exit(-1);
}
