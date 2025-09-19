# CUET E-Cash SQL Setup Guide

## 🔧 Issues Fixed

### ❌ Problems Found:
1. **Corrupted `data.sql`** - contained Java/JavaScript code instead of SQL
2. **Database name inconsistency** - `cuet_ecash` vs `ecash_db`
3. **Entity mapping mismatches** - table names and column names didn't match between SQL schema and Java entities
4. **Missing initial data** - no INSERT statements for test data
5. **Port configuration issues** - frontend/backend port mismatches

### ✅ Solutions Applied:

#### 1. **Fixed `data.sql`**
- Removed all corrupted Java/JavaScript code
- Added proper SQL INSERT statements for initial data
- Included sample users, officers, halls, students, fees, and payments

#### 2. **Standardized Database Names**
- Consistent use of `cuet_ecash` database name
- Added `createDatabaseIfNotExist=true` to connection URL

#### 3. **Fixed Entity Mappings**
- All Java entity `@Table` annotations now match SQL table names (lowercase with underscores)
- All `@Column` annotations match SQL column names
- Fixed foreign key column mappings

#### 4. **Enhanced Configuration**
- Updated `application.properties` for proper data initialization
- Added `spring.sql.init.mode=always` for data.sql execution
- Added `spring.jpa.defer-datasource-initialization=true` for proper ordering

#### 5. **Created Manual Setup Script**
- `database_setup.sql` - Complete script for MySQL Workbench setup

## 🚀 Setup Options

### Option 1: Automatic (Spring Boot)
1. Make sure MySQL server is running
2. Update password in `application.properties` if needed
3. Run the Spring Boot application
4. Database and tables will be created automatically

### Option 2: Manual (MySQL Workbench)
1. Open MySQL Workbench
2. Open and execute `database_setup.sql`
3. Change `spring.jpa.hibernate.ddl-auto=validate` in application.properties
4. Run Spring Boot application

## 🗄️ Database Structure

### Tables Created:
- `user_table` - Authentication and user roles
- `officer` - Administrative staff information
- `hall` - Dormitory/residence hall data
- `student` - Student profiles and academic info
- `notice` - System announcements
- `semester_fee` - Academic fee structures
- `hall_fee` - Dormitory fee structures
- `payment` - Transaction records
- `exam_approval` - Exam approval workflows

## 👤 Test Accounts

All accounts use password: **`password123`**

| Role | Email | Purpose |
|------|-------|---------|
| Admin | `admin@cuet.ac.bd` | Full system access |
| Hall Officer | `hallofficer@cuet.ac.bd` | Hall management |
| Officer | `officer@cuet.ac.bd` | Academic officer |
| Student | `student1@student.cuet.ac.bd` | Test student account |
| Student | `student2@student.cuet.ac.bd` | Another test student |

## 🔐 Security Notes

- Passwords are properly BCrypt hashed
- JWT authentication configured
- Role-based access control implemented
- Database credentials should be changed for production

## 🛠️ Configuration Details

### Database Connection:
- **Host**: localhost:3306
- **Database**: cuet_ecash
- **Username**: root
- **Password**: 220427 (change this!)

### Server:
- **Port**: 5454
- **Context Path**: /

## 📝 Next Steps

1. **Test the application** with provided credentials
2. **Change default passwords** for production
3. **Update database credentials** as needed
4. **Add more test data** if required
5. **Configure production database** settings

## ⚠️ Important Notes

- The `data.sql` now contains proper SQL statements only
- All entity mappings are fixed and consistent
- Database will be recreated on each startup (change `ddl-auto` for production)
- Initial data includes realistic CUET hall names and departments

## 🔍 Verification

After setup, you can verify by:
1. Logging into the application with test credentials
2. Checking database tables in MySQL Workbench
3. Running the verification query at the end of `database_setup.sql` 