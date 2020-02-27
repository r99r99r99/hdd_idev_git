package net.huadong.tech;
public class User{
		private String name;
		private String password;
		private String money;
		private String number;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getMoney() {
			return money;
		}
		public void setMoney(String money) {
			this.money = money;
		}
		public String getNumber() {
			return number;
		}
		public void setNumber(String number) {
			this.number = number;
		}
		public User(String name, String password, String money, String number) {
			super();
			this.name = name;
			this.password = password;
			this.money = money;
			this.number = number;
		}
		public User() {
			super();
			// TODO Auto-generated constructor stub
		}
		
	}