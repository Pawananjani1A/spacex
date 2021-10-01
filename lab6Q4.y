%{
#include <stdio.h>
#include <string.h>
%}
%token NUMBER TOKHEAT STATE TOKTARGET TOKTEMPERATURE
%%
commands:
 | commands command
 ;
command:
 heat_switch
 |
 target_set
 ;
heat_switch:
 TOKHEAT STATE
 {
 if($2)
 printf("\tHeater on!\n");
 else
 printf("\tHeater off!\n");
 }
 ;
target_set:
 TOKTARGET TOKTEMPERATURE NUMBER
 {
 printf("\tNew temperature set!\n");
 }
 ;
%%
int yyerror(const char *str)
{
 fprintf(stderr,"error: %s\n",str);
}
int yywrap()
{
 return 1;
}

main()
{
 yyparse();
} 