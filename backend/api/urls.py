from django.urls import path
from . import views


urlpatterns = [
    # Authentication URLs...
    path('user/registration/', views.userRegistration, name='register'),
    path('user/login/', views.userLogin, name='login'),
    
    # User Profile Dashboard Url..
    path('user/userProfile/', views.userProfile, name='user_profile'),
    path('user/changePassword/', views.userChangePassword, name='change_password'),
     
    # Products and Other URLs....
    path('productDetails/<str:subCategory>/', views.productDetails),
    path('feedback/<str:prod_id>/', views.feedback),
    path('addUserAddress/', views.addUserAddress),
    path('getUserAddress/<str:cust_id>/', views.getUserAddress),
    path('searchResults/<str:slug>/', views.searchResults),
    path('categories/', views.categories),
    path('popularProducts/', views.popularProducts),  
    path('subCategory/<str:category>/', views.subCategory),    
    path('cart/<str:cust_id>/', views.cart),
    path('addtoCart/', views.addtoCart),
    path('updateCartQty/<str:id>/<str:scope>/', views.updateCartQty),
    path('deleteCartItem/<str:id>/', views.deleteCartItem),   
    path('orderSummary/', views.cart),
    path('checkout/', views.checkout),
    path('saveOrderDetail/', views.saveOrderDetail),
    path('emptyOrderedCart/<str:id>/', views.emptyOrderedCart),  
    path('getMyOrders/<str:cust_id>/', views.getMyOrders),   
    path('getInvoiceDetails/<str:order_id>/', views.getInvoiceDetails),   
    path('getOrderAddress/<str:add_id>/', views.getOrderAddress),
    path('getCustomers/', views.getCustomers),
    path('getTotalSales/', views.getTotalSales),
    path('getStockCount/<str:prod_id>/', views.getStockCount),
    path('getUserAddressReport/', views.getUserAddressReport),






     

]