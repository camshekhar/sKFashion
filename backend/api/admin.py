from django.contrib import admin
from .models import Product, Category, SubCategory, Cart, OrderSummary, User, Feedback
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
class UserModelAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'username', 'fname', 'lname','is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('fname', 'lname', 'username')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'fname', 'lname', 'username' 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'username',)
    ordering = ('email', 'id')
    filter_horizontal = ()   
    
admin.site.register(User, UserModelAdmin) 

   
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'desc')
    
admin.site.register(Category, CategoryAdmin)     
    
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')    
   
admin.site.register(SubCategory, SubCategoryAdmin) 

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'color', 'size', 'desc')
   
admin.site.register(Product, ProductAdmin) 

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'color', 'size', 'price', 'quantity')
   
admin.site.register(Cart, CartAdmin) 

class OrderSummaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'subTotal', 'shippingCharge', 'discount', 'total')
   
admin.site.register(OrderSummary, OrderSummaryAdmin)

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'cust_id', 'prod_id', 'rating', 'comment')
   
admin.site.register(Feedback, FeedbackAdmin) 

