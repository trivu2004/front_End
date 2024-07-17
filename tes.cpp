#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

#define MAX 100

int main()
{
    int a[MAX], n;

    cout << "Nhap so phan tu cua mang: ";
    cin >> n;

    srand(time(NULL));

    for (int i = 0; i < n; i++)
        a[i] = rand() % 100;

    cout << "Cac phan tu cua mang: ";
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";

    // in ra chi so cua phan tu cuoi co gia tri chan(mang kieu nguyen)
    int PT_cuoi_GT_chan = -1;
    for (int i = 0; i < n; i++)
    {
        if (a[i] % 2 == 0)
        {
            PT_cuoi_GT_chan = i;
        }
    }

    if (PT_cuoi_GT_chan == -1)
        cout << "\nKhong co phan tu chan.\n";
    else
        cout << "\nPhan tu cuoi co gia tri chan: " << PT_cuoi_GT_chan << endl;

    // dem so lan x xuat hien trong mang( phan tu a[i] co gia tri x bang)
    int x;
    cout << "\nNhap x: ";
    cin >> x;
    int count = 0;
    for (int i = 0; i < n; i++)
    {
        if (a[i] == x)
        {
            count++;
        }
    }

    // dem so gia tri chan trong mang
    int dem = 0;
    for (int i = 0; i < n; i++)
    {
        if (a[i] % 2 == 0)
        {
            dem++;
        }
    }

    // tim gia tri lon nhat trong mang kieu so nguyen
    int giatri = a[0];
    for (int i = 0; i < n; i++)
    {
        if (a[i] > giatri)
        {
            giatri = a[i];
        }
    }

    cout << "\nSo lan x xuat hien trong mang: " << count << endl;
    cout << "\nSo gia tri chan co trong mang: " << dem << endl;
    cout << "Gia tri lon nhat trong mang la: " << giatri << endl;

    return 0;
}
