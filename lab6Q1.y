%{
	/* Definition section */
	#include <stdio.h>
	#include <string.h>
	#include <stdlib.h>
	extern int yylex();
	
	void yyerror(char *msg);
	int num,n,sum=0,r;	
%}

%union {
	char* f;
}

%token <f> STR
%type <f> E

/* Rule Section */
%%

S : E {
		
		num=atoi($1);
		n=num;
		while(n!=0)
		{
		r=n%10;
		sum=(sum*10)+r;
		n=n/10;
		}
		printf("Reversed Numer=%d\n",sum);
		if(num==sum)
		printf("Palindrome Number!!\n");
		else
		printf("Not a Palindrome Number!!\n");
		}
;

E : STR {$$ = $1;}
;

%%

void yyerror(char *msg)
{
	fprintf(stderr, "%s\n", msg);
	exit(1);
}

//driver code
int main()
{
	printf("Enter a number.\n");
	yyparse();
	return 0;
}

