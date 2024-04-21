from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Custom User Manager..
class UserManager(BaseUserManager):
    def create_user(self, email, fname, lname, username, password=None, password2 = None):
        """
        Creates and saves a User with the given email, name, tc,
        password and password2.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            fname = fname,
            lname = lname,
            username = username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fname, lname, username, password=None):
        """
        Creates and saves a superuser with the given email, 
        name and password.
        """
        user = self.create_user(
            email,
            password=password,
            fname = fname,
            lname = lname,
            username = username,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
# Custom User Model..
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    fname = models.CharField(max_length=200)
    lname = models.CharField(max_length=200, default=None)
    username = models.CharField(max_length=200, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'lname', 'username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
    
class Category(models.Model):
    title = models.CharField(max_length= 100, primary_key = True)
    desc = models.CharField(max_length= 200)
    image = models.CharField(max_length= 300)
    
    def __str__(self):
        return self.title
    
    
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length= 100, primary_key = True)
    desc = models.CharField(max_length= 200)
    image = models.CharField(max_length= 300)  
    
    def __str__(self):
        return self.title
      
    
class Product(models.Model):
    id = models.CharField(max_length= 100, primary_key = True)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.DO_NOTHING, default="ffsf")
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, default="dfd")
    title = models.CharField(max_length= 100)
    desc = models.CharField(max_length= 200)
    color = models.CharField(max_length= 100)
    size = models.CharField(max_length= 100)
    image  = models.CharField(max_length= 300)
    price = models.CharField(max_length= 100, default="0")
    stockCount = models.IntegerField(default="0")
    
    def __str__(self):
        return self.title
    
class Cart(models.Model):
    id = models.CharField(max_length= 100, primary_key = True)
    title = models.CharField(max_length= 100)
    color = models.CharField(max_length= 100)
    size = models.CharField(max_length= 20)
    image  = models.CharField(max_length= 300)
    quantity = models.CharField(max_length= 20)
    price = models.CharField(max_length= 100, default="0")
   
class OrderSummary(models.Model):
    id = models.OneToOneField(Cart, models.CASCADE , primary_key= True)                  
    subTotal = models.CharField(max_length= 100)
    discount = models.CharField(max_length= 100)
    shippingCharge = models.CharField(max_length= 100, default="100")
    total = models.CharField(max_length=100)   

# class PopularProducts(models.Model):
#     subCategory = models.ForeignKey(SubCategory, on_delete=models.DO_NOTHING, default="ffsf")
#     category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, default="dfd")
#     title = models.CharField(max_length= 100)
#     desc = models.CharField(max_length= 200)
#     color = models.CharField(max_length= 100)
#     size = models.CharField(max_length= 100)
#     image  = models.CharField(max_length= 300)
#     price = models.CharField(max_length= 100, default="0")
#     stockCount = models.IntegerField(default="0")
#     feedback = models.ForeignKey(Feedback., on_delete=models.DO_NOTHING, default="dfd")

    
#     def __str__(self):
#         return self.title

class Feedback(models.Model):
    id = models.IntegerField(primary_key = True)
    prod_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING, default='0')
    cust_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, default='0')
    rating = models.IntegerField(default='0')
    comment = models.CharField(max_length= 100) 