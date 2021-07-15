from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def unique_username(form, field):
    username = field.data
    id = form.data['id']
    user = User.query.filter(User.username == username).first()
    if user and user.id != id:
        raise ValidationError("Username is already in use.")


def unique_email(form, field):
    email = field.data
    id = form.data['id']
    user = User.query.filter(User.email == email).first()
    if user and user.id != id:
        raise ValidationError("Email is already in use.")


class EditUserForm(FlaskForm):
    id = IntegerField('id')
    username = StringField('username', validators=[
                           DataRequired(), unique_username])
    email = StringField('email', validators=[DataRequired(), unique_email])
    password = StringField('password', validators=[DataRequired()])
