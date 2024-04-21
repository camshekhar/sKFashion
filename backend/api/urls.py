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
    path('categories/', views.categories),
    path('popularProducts/', views.popularProducts),  
    path('subCategory/<str:category>/', views.subCategory),    
    path('cart/', views.cart),
    path('addtoCart/', views.addtoCart),
    path('updateCartQty/<str:id>/<str:scope>/', views.updateCartQty),
    path('deleteCartItem/<str:id>/', views.deleteCartItem),   
    path('orderSummary/', views.cart),
    path('checkout/', views.checkout),

     

]