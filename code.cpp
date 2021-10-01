#include <bits/stdc++.h>
using namespace std;

#define ll long long int
#define mod 1000000007

void solve(ll tct){
    ll n,m;ll i,j;
    cin >> m >> n;
   // ll ar[n];
    unordered_map<ll,ll> mp,mmp;
    
    ll arr[m+1][n];
    
    for(i=0;i<=m;i++){
        for(j=0;j<n;j++){
            cin >> arr[i][j];
        }
    }
    ll ct=0;
    for(i=0;i<n;i++){
        mp[arr[0][i]]++;
        mmp[arr[0][i]]++;
    }
    for(i=1;i<=m;i++){
        for(j=0;j<n;j++){
            if(mp[arr[i][j]] == 0){
                ct++;
              //  cout << arr[i][j] << " ";
            }
            else
            mp[arr[i][j]]--;
        }
        if(mmp.size() > 0)
        for(auto x : mp){
            if(x.second > 0){
                ll tp = min(x.second,mmp[x.first]);
                ct -= tp;
                mmp[x.first] -= tp;
            }
        }
        mp.clear();
        for(j=0;j<n;j++){
            mp[arr[i][j]]++;
        }
    }
    
   // cout << ct << "\n";
    
    
    cout << "Case #" << tct << ": " << ct << "\n";
    
}

int main(){

    #ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    #endif

    ios_base :: sync_with_stdio(0);
    cin.tie(NULL);
    
    int t;
    cin >> t;ll a=1;
    while(t > 0){
        solve(a);
        t--;
        a++;
    }
    
    return 0;
}